let groups = [];

const Add = (id, theme) => {
  if (!Find(id)) {
    return groups.push({ id, theme });
  }
  return false;
};

const Delete = (id) => {
  if (Find(id)) {
    groups = groups.filter((x) => x.id !== id);
    return true;
  }
  return false;
};

const Update = (id, theme) => {
  const group = Find(id);
  return group ? group.theme : false;
};

const Find = (id) => {
  return groups.find((g) => g.id === id) ?? false;
};

const getTheme = (id) => {
  const group = Find(id);
  return group ? group.theme : false;
};

module.exports = { Add, Delete, Update, Find, getTheme };
