const ReturnReporTemplateActions = (permissions) => {
  let actions = [];

  if (permissions.canView) {
    actions.push("View");
  }

  if (permissions.canEdit) {
    actions.push("Edit");
  }

  if (permissions.canDownload) {
    actions.push("Download");
  }

  if (permissions.canDelete) {
    actions.push("Delete");
  }

  return actions;
};

export default ReturnReporTemplateActions;
