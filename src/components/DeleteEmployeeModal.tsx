interface DeleteEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteEmployeeModal: React.FC<DeleteEmployeeModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-xl max-w-xs sm:max-w-sm md:max-w-md w-full mx-4">
        <h2 className="text-lg sm:text-xl font-bold mb-4">Confirmar exclusão</h2>
        <p className="mb-4 text-sm sm:text-base">Tem certeza que deseja excluir este funcionário?</p>
        <div className="flex justify-end gap-2">
          <button
            className="px-3 sm:px-4 py-1 sm:py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors text-sm sm:text-base"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="px-3 sm:px-4 py-1 sm:py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm sm:text-base"
            onClick={onConfirm}
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteEmployeeModal;
