import { ElMessage } from 'element-plus';

export default (code: number, msg: string) => {
  if (code === 0) {
    ElMessage({
      message: msg,
      type: 'success',
    });
  } else {
    ElMessage({
      message: msg,
      type: 'error',
    });
  }
};
