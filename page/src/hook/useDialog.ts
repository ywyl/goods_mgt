export default () => {
  let visiable: boolean = false;

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
  }
}