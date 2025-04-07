const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const { userRepository } = require('../repositories/userRepository');

const uploadDir = path.join(__dirname, '../public/uploads/avatars');

async function ensureUploadDirExists() {
  try {
    await fs.mkdir(uploadDir, { recursive: true });
  } catch (err) {
    console.error('Erro ao criar diretório de uploads:', err);
  }
}

ensureUploadDirExists();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: async (req, file, cb) => {
    try {
      const ext = path.extname(file.originalname);
      const newFilename = `avatar-${req.user.id}-${Date.now()}${ext}`;
      
      const user = await userRepository.getProfile(req.user.id)
      req.oldAvatar = user?.avatar_url || null;
      
      cb(null, newFilename);
    } catch (error) {
      cb(error);
    }
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Apenas imagens são permitidas!'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }
});

const uploadWithCleanup = (req, res, next) => {
  upload.single('avatar')(req, res, async (err) => {
    if (err) return next(err);
    
    try {
      if (req.oldAvatar) {
        const oldPath = path.join(uploadDir, path.basename(req.oldAvatar));
        try {
          await fs.unlink(oldPath);
          console.log(`Avatar antigo removido: ${oldPath}`);
        } catch (unlinkErr) {
          console.warn('Não foi possível remover o avatar antigo:', unlinkErr);
        }
      }
      
      next();
    } catch (error) {
      next(error);
    }
  });
};

module.exports = { uploadWithCleanup };