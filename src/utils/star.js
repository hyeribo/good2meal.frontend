const localStorageItemName = 'good2meal_star';

const _getStar = () => {
  const item = localStorage.getItem(localStorageItemName);
  if(item) return JSON.parse(item);
  else return {};
}

const addStar = (id) => {
  try {
    if(!id) return;
    const item = _getStar();
    item[id] = true;
    localStorage.setItem(localStorageItemName, JSON.stringify(item));

  } catch (error) {
    console.log(error);
  }
}

const removeStar = (id) => {
  try {
    if(!id) return;
    const item = _getStar();
    delete item[id];
    localStorage.setItem(localStorageItemName, JSON.stringify(item));
    
  } catch (error) {
    console.log(error);
  }
}

const isStarred = (id) => {
  try {
    if(!id) return;
    const item = _getStar();
    return item[id] === true;
    
  } catch (error) {
    console.log(error);
  }
}

export default {
  addStar,
  removeStar,
  isStarred,
};