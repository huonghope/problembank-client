import createModalProvider from './createModalProvider';
import DeleteModalContent from './ModalContent/DeleteModalContent';
import NoticeContent from './ModalContent/NoticeContent';
import ReportErrorContent from './ModalContent/ReportErrorContent';

// 모달의 내용을 결정하기 위한 상수
export const CONFIRM_DELETE_MODAL = 'confirm_delete';
export const NOTICE_MODAL = 'notice';
export const REPORT_ERROR_MODAL = 'report_error';

// 모달의 내용들
const CONTENT_MAP = {
	[CONFIRM_DELETE_MODAL]: DeleteModalContent,
	[NOTICE_MODAL]: NoticeContent,
	[REPORT_ERROR_MODAL]: ReportErrorContent,
};

export default createModalProvider(CONTENT_MAP);
