import ReactPortal from "./ReactProtal";

function Modal({ children, isOpen, handleClose }) {
	if (!isOpen) return null;

	return (
		<ReactPortal wrapperId="react-portal-modal-container">
			<div
				onClick={() => handleClose()}
				className="fixed inset-0  flex  flex-col items-center justify-center transition-all overflow-hidden z-[999] bg-gray-300 bg-opacity-70"
			>
				<div className="w-full h-full flex items-centers">{children}</div>
			</div>
		</ReactPortal>
	);
}
export default Modal;
