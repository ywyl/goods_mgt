export default () => {
  const visiable = false;

  function openDialog(visiable: boolean) {
    visiable = true;
  }

  function closeDialog(visiable: boolean) {
    visiable = true;
  }

  return {
    visiable,
    openDialog,
    closeDialog,
  };
};
