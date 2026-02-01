import moment from 'moment';


export const searchFilterFunction = (text, arrayholder, setData) => {
    const newData = arrayholder.filter(item => {
      const itemData = `${item.content_langue_origine.toUpperCase()} ${item.content_langue_cible.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setData(newData); // Utilisez la fonction setData pour mettre à jour l'état
  };
export const searchVideoFilterFunction = (text, arrayholder, setData) => {
    const newData = arrayholder.filter(item => {
      const itemData = `${item.content_langue_origine.toUpperCase()} ${item.legende_f.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setData(newData); // Utilisez la fonction setData pour mettre à jour l'état
  };

export const filterByDateRange = (arrayholder, setData, startDate, endDate) => {
  const lowerLimit = startDate.format("YYYY-MM-DD");
  const upperLimit = endDate.format("YYYY-MM-DD");
  const newData = arrayholder.filter(data => lowerLimit <= data.date_creation && data.date_creation <= upperLimit);
  setData(newData);
};
  
  export const filterByWeek = (arrayholder, setData) => {
    const endOfWeek = moment().endOf('week');
    const startOfWeek = moment().startOf('week');
    filterByDateRange(arrayholder, setData, startOfWeek, endOfWeek);
  };
  
  export const filterByMonth = (arrayholder, setData) => {
    const endOfMonth = moment().endOf('month');
    const startOfMonth = moment().startOf('month');
    filterByDateRange(arrayholder, setData, startOfMonth, endOfMonth);
  };
  
  export const filterByYear = (arrayholder, setData) => {
    const currentYear = moment().year();
    const startOfYear = moment().startOf('year');
    const endOfYear = moment().endOf('year');
    filterByDateRange(arrayholder, setData, startOfYear, endOfYear);
  };
  
  export const filterbycat = (text, arrayholder, setData)=> {
    return function filter(item) {
      const itemData = `${item.intitule.toUpperCase()}`;
      const textData = itemValue.toUpperCase();
      return itemData.indexOf(textData) > -1;
    };
  };
  
  // fichier1.js

export const groupDataByIntitule = (data) => {
  return data.reduce((acc, currentItem) => {
    let group = acc.find(groupItem => groupItem.intitule === currentItem.intitule);

    if (!group) {
      group = { intitule: currentItem.intitule, items: [] };
      acc.push(group);
    }

    group.items.push(currentItem);

    return acc;
  }, []);
};

    

  