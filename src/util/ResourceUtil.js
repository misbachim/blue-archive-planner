import artifactData from '../resource/artidata.json';
import blurayData from '../resource/bludiskdata.json';
import characterData from '../resource/charData.json';
import gearData from '../resource/gearData.json';
import skillBookData from '../resource/skillbookdata.json';
import otherData from '../resource/otherdata.json';
import { ITEM_TYPE } from '../constant/ResourceDataConstant';
import { RESOURCE_TYPE } from './../constant/ResourceDataConstant';

export function getName(resource) {
  if (resource.type===RESOURCE_TYPE.CHARACTER) {
    const foundData = characterData.find(d => d.student===resource.character)
    return foundData !== undefined ? foundData.student : 'Not Found X.x'
  } else 
  if (resource.type===ITEM_TYPE.BLURAY_DISK) {
    const foundData = blurayData.find(d => d.item===resource.item && d.tier===resource.tier)
    return foundData !== undefined ? foundData.name : 'Not Found X.x'
  } else 
  if (resource.type===ITEM_TYPE.SKILL_BOOK) {
    const foundData = skillBookData.find(d => d.item===resource.item && d.tier===resource.tier)
    return foundData !== undefined ? foundData.name : 'Not Found X.x'
  } else 
  if (resource.type===ITEM_TYPE.ARTIFACT) {
    const foundData = artifactData.find(d => d.item===resource.item && d.tier===resource.tier)
    return foundData !== undefined ? foundData.name : 'Not Found X.x'
  } else
  if (resource.type===RESOURCE_TYPE.GEAR) {
    const foundData = gearData.find(d => d.item===resource.item && d.tier===resource.tier)
    return foundData !== undefined ? foundData.name : 'Not Found X.x'
  } else {
    const foundData = otherData.find(d => d.item===resource.item && d.tier===resource.tier)
    return foundData !== undefined ? foundData.name : 'Not Found X.x'
  }
}

export function getImage(resource) {
  let image = 'https://static.wikia.nocookie.net/blue-archive/images/7/77/Gacha_-_Blue_1.png'
  if (resource.type===RESOURCE_TYPE.CHARACTER) {
    const foundData = characterData.find(d => d.student===resource.character)
    image = foundData !== undefined ? foundData.image : image
  } else 
  if (resource.type===ITEM_TYPE.BLURAY_DISK) {
    const foundData = blurayData.find(d => d.item===resource.item && d.tier===resource.tier)
    image = foundData !== undefined ? foundData.image : image
  } else 
  if (resource.type===ITEM_TYPE.SKILL_BOOK) {
    const foundData = skillBookData.find(d => d.item===resource.item && d.tier===resource.tier)
    image = foundData !== undefined ? foundData.image : image
  } else 
  if (resource.type===ITEM_TYPE.ARTIFACT) {
    const foundData = artifactData.find(d => d.item===resource.item && d.tier===resource.tier)
    image = foundData !== undefined ? foundData.image : image
  } else 
  if (resource.type===RESOURCE_TYPE.GEAR) {
    const foundData = gearData.find(d => d.item===resource.item && d.tier===resource.tier)
    image = foundData !== undefined ? foundData.image : image
  } else {
    const foundData = otherData.find(d => d.item===resource.item && d.tier===resource.tier)
    image = foundData !== undefined ? foundData.image : image
  }

  return image
}

function compare(a, b) {
  if ( a < b ){
    return -1;
  }
  if ( a > b ){
    return 1;
  }
  return 0;
}

export function sortItem(items) {
  return items.sort((a, b) => {
    const typeA = a.type
    const tierA = a.tier
    const itemA = a.item
    const typeB = b.type
    const tierB = b.tier
    const itemB = b.item

    if (typeA === ITEM_TYPE.EXP_REPORT) {
      if (typeB === typeA) {
        return compare(tierA, tierB)
      } 
      return -1
    }
    
    if (typeA === ITEM_TYPE.EXP_ORB) {
      if (typeB === typeA) {
        return compare(tierA, tierB)
      } 
      if (typeB === ITEM_TYPE.EXP_REPORT) {
        return 1
      } 
      return -1
    }
    
    if (typeA === ITEM_TYPE.CREDIT) {
      if (typeB === typeA) {
        return compare(tierA, tierB)
      } 
      if (typeB === ITEM_TYPE.EXP_REPORT || typeB === ITEM_TYPE.EXP_ORB) {
        return 1
      } 
      return -1
    }
    
    if (typeA === ITEM_TYPE.ARTIFACT) {
      if (typeB === typeA) {
        if (itemA !== itemB) {
          const indexA = artifactData.findIndex(d => d.item === itemA)
          const indexB = artifactData.findIndex(d => d.item === itemB)
          return compare(indexA, indexB)
        }
        return compare(tierA, tierB)
      } 
      if (typeB === ITEM_TYPE.EXP_REPORT || typeB === ITEM_TYPE.EXP_ORB || typeB === ITEM_TYPE.CREDIT) {
        return 1
      } 
      return -1
    }

    if (typeA === ITEM_TYPE.BLURAY_DISK) {
      if (typeB === typeA) {
        if (itemA !== itemB) {
          const indexA = blurayData.findIndex(d => d.item === itemA)
          const indexB = blurayData.findIndex(d => d.item === itemB)
          return compare(indexA, indexB)
        }
        return compare(tierA, tierB)
      } 
      if (typeB === ITEM_TYPE.EXP_REPORT 
          || typeB === ITEM_TYPE.EXP_ORB 
          || typeB === ITEM_TYPE.ARTIFACT
          || typeB === ITEM_TYPE.CREDIT) {
        return 1
      } 
      return -1
    }

    if (typeA === ITEM_TYPE.SKILL_BOOK) {
      if (typeB === typeA) {
        if (itemA !== itemB) {
          const indexA = skillBookData.findIndex(d => d.item === itemA)
          const indexB = skillBookData.findIndex(d => d.item === itemB)
          return compare(indexA, indexB)
        }
        return compare(tierA, tierB)
      } 
      if (typeB === ITEM_TYPE.EXP_REPORT 
          || typeB === ITEM_TYPE.EXP_ORB 
          || typeB === ITEM_TYPE.ARTIFACT
          || typeB === ITEM_TYPE.BLURAY_DISK
          || typeB === ITEM_TYPE.CREDIT) {
        return 1
      } 
      return -1
    }

    if (typeB === typeA) {
      if (tierA < tierB) {
        return compare(tierA, tierB)
      } 
    }
    
    return 0
  })
}