import { GEAR_EXP_REQ_TO_LEVEL } from '../constant/ExpOrbReqConstant'
import { EXP_REQ_TO_LEVEL } from '../constant/ExpReportReqConstant'
import { ITEM_TYPE } from '../constant/ResourceDataConstant'
import { useMainGoals } from '../contexts/MainGoalContext'
import charData from '../resource/charData.json'
import gearData from '../resource/gearData.json'
import { RESOURCE_TYPE } from './../constant/ResourceDataConstant';
import { sortItem } from './ResourceUtil'
import { GEAR_REQ_TO_UPGRADE } from '../constant/GearReqConstant'

function expCharacterToCredit(xp) {
  return xp*7
}

function expGearToCredit(xp) {
  return xp*4
}

function getRequiredExpGearToMax(currentTier) {
  let totalExp = 0;
  for (let ascension = 0; ascension <= currentTier; ascension++) {
    const element = GEAR_EXP_REQ_TO_LEVEL[ascension];
    totalExp = totalExp + element
  }
  return totalExp
}

function getRequiredExpCharacter(currentLevel, goalLevel) {
  const req = EXP_REQ_TO_LEVEL[goalLevel - 1] - EXP_REQ_TO_LEVEL[currentLevel - 1]
  return req
}

export default function CostUtil() {
  const { mainGoals } = useMainGoals()

  function getTotalCost() {
    let totalCost = []
    const totalLevelCost = getTotalLevelCost()
    const totalSkillCost = getTotalSkillCost()
    const totalGearCost = getTotalGearCost()

    totalCost.push(...totalLevelCost)

    totalSkillCost.forEach(skillCost => {
      const oldTotalCost = totalCost.find(cost => 
        cost.type===skillCost.type
        && cost.item===skillCost.item
        && cost.tier===skillCost.tier)
      if (oldTotalCost !== undefined) {
        oldTotalCost.totalGoal = oldTotalCost.totalGoal + skillCost.currentGoal
      } else {
        totalCost.push({...skillCost, totalGoal: skillCost.currentGoal})
      }
    })

    totalGearCost.forEach(gearCost => {
      const oldTotalCost = totalCost.find(cost => 
        cost.type===gearCost.type
        && cost.item===gearCost.item
        && cost.tier===gearCost.tier)
      if (oldTotalCost !== undefined) {
        oldTotalCost.totalGoal = oldTotalCost.totalGoal + gearCost.currentGoal
      } else {
        totalCost.push({...gearCost, totalGoal: gearCost.currentGoal})
      }
    })

    return totalCost
  }

  function getLevelCost(currentLevel, goalLevel) {
    const expReport = {
      type: ITEM_TYPE.EXP_REPORT,
      item: ITEM_TYPE.EXP_REPORT,
      tier:3,
      currentGoal: getRequiredExpCharacter(currentLevel, goalLevel),
    }
    const credit = {
      type: ITEM_TYPE.CREDIT,
      item: ITEM_TYPE.CREDIT,
      tier:1,
      currentGoal: expCharacterToCredit(getRequiredExpCharacter(currentLevel, goalLevel)),
    }
    return [expReport, credit]
  }

  function getTotalLevelCost() {
    let totalReqExp = mainGoals.reduce((total,character) => {
      if (character.type!==RESOURCE_TYPE.CHARACTER) {
        return total
      }
      const currentLevel = character.current.level
      const goalLevel = character.goal.level
      const req = getRequiredExpCharacter(currentLevel, goalLevel)
      return total+req
    }, 0);

    const expReport = {
      type: ITEM_TYPE.EXP_REPORT,
      item: ITEM_TYPE.EXP_REPORT,
      tier:3,
      totalGoal: totalReqExp,
    }
    const credit = {
      type: ITEM_TYPE.CREDIT,
      item: ITEM_TYPE.CREDIT,
      tier:1,
      totalGoal: expCharacterToCredit(totalReqExp),
    }

    return [expReport, credit]
  }

  function getExSkillCost(character, currentLevel, goalLevel, totalCost=[]) {
    const student = charData.find(char => char.student===character)

    for (let index = currentLevel-1; index < goalLevel-1; index++) {
      const reqItems = student.skillRequirement.ex[index]
      reqItems.forEach(element => {
        const oldCost = totalCost.find(c => c.type===element.type && c.item===element.item && c.tier===element.tier)
        if (oldCost !== undefined) {
          oldCost.currentGoal = oldCost.currentGoal + element.value
        } else {
          const newCost = {...element, currentGoal: element.value}
          
          totalCost.push(newCost)
        }
      });
    }
    
    return totalCost
  }

  function getOtherSkillCost(character, currentLevel, goalLevel, totalCost=[]) {
    const student = charData.find(char => char.student===character)

    for (let index = currentLevel-1; index < goalLevel-1; index++) {
      const reqItems = student.skillRequirement.other[index]
      reqItems.forEach(element => {
        const oldCost = totalCost.find(c => c.type===element.type && c.item===element.item && c.tier===element.tier)
        if (oldCost !== undefined) {
          oldCost.currentGoal = oldCost.currentGoal + element.value
        } else {
          const newCost = {...element, currentGoal: element.value}
          
          totalCost.push(newCost)
        }
      });
    }
    
    return totalCost
  }

  function getSkillCost(
        character, 
        currentExLevel, goalExLevel, 
        currentNormalLevel, goalNormalLevel, 
        currentPassiveLevel, goalPassiveLevel, 
        currentSubLevel, goalSubLevel, 
      ) {
    let totalCost = []
    if (currentExLevel !== goalExLevel) {
      totalCost = getExSkillCost(character, currentExLevel, goalExLevel, totalCost)
    }
    if (currentNormalLevel !== goalNormalLevel) {
      totalCost = getOtherSkillCost(character, currentNormalLevel, goalNormalLevel, totalCost)
    }
    if (currentPassiveLevel !== goalPassiveLevel) {
      totalCost = getOtherSkillCost(character, currentPassiveLevel, goalPassiveLevel, totalCost)
    }
    if (currentSubLevel !== goalSubLevel) {
      totalCost = getOtherSkillCost(character, currentSubLevel, goalSubLevel, totalCost)
    }

    return sortItem(totalCost)
  }

  function getTotalSkillCost() {
    let totalCost = []
    mainGoals.forEach(character => {
      if (character.type!==RESOURCE_TYPE.SKILL) {
        return
      }
      if (character.ex.current !== character.ex.goal) {
        totalCost = getExSkillCost(character.character, character.ex.current, character.ex.goal, totalCost)
      }
      if (character.normal.current !== character.normal.goal) {
        totalCost = getOtherSkillCost(character.character, character.normal.current, character.normal.goal, totalCost)
      }
      if (character.passive.current !== character.passive.goal) {
        totalCost = getOtherSkillCost(character.character, character.passive.current, character.passive.goal, totalCost)
      }
      if (character.sub.current !== character.sub.goal) {
        totalCost = getOtherSkillCost(character.character, character.sub.current, character.sub.goal, totalCost)
      }
    });

    return totalCost
  }

  function getTotalGearCost() {
    let totalCost = []
    mainGoals.forEach(character => {
      if (character.type!==RESOURCE_TYPE.GEAR) {
        return
      }
        totalCost = getGearCost(
          character.character, 
          character.current.slot1.level, character.goal.slot1.level, 
          character.current.slot1.tier, character.goal.slot1.tier, 
          character.current.slot2.level, character.goal.slot2.level, 
          character.current.slot2.tier, character.goal.slot2.tier, 
          character.current.slot3.level, character.goal.slot3.level, 
          character.current.slot3.tier, character.goal.slot3.tier, 
          totalCost)
    });

    return totalCost
  }

  function getGearCost(
        character, 
        currentSlot1Level, goalSlot1Level, currentSlot1Tier, goalSlot1Tier,
        currentSlot2Level, goalSlot2Level, currentSlot2Tier, goalSlot2Tier,
        currentSlot3Level, goalSlot3Level, currentSlot3Tier, goalSlot3Tier,
        totalCost = []
      ) {
    const student = charData.find(char => char.student===character)

    const countExp = (currentTier) => {
      const expOrb = {
        type: ITEM_TYPE.EXP_ORB,
        item: ITEM_TYPE.EXP_ORB,
        tier: 3,
        currentGoal: getRequiredExpGearToMax(currentTier),
      }
      totalCost = insertUpdateCost(totalCost, expOrb, character)
      
      const credit = {
        type: ITEM_TYPE.CREDIT,
        item: ITEM_TYPE.CREDIT,
        tier: 1,
        currentGoal: expGearToCredit(getRequiredExpGearToMax(currentTier)),
      }
      totalCost = insertUpdateCost(totalCost, credit, character)
    }

    const countUpgrade = (gearSlot, currentTier) => {
      const charGear = student.equipment[gearSlot]

      const reqGears = GEAR_REQ_TO_UPGRADE[currentTier]
      reqGears.forEach(reqGear => {
        const gear = gearData.find(g => g.item === charGear && g.tier === reqGear.tier)
        totalCost = insertUpdateCost(totalCost, {...gear, currentGoal: reqGear.value}, character)
      });
    }
    
    const countCost = (gearSlot, currentGearTier, goalGearTier, currentGearLevel, goalGearLevel) => {
      for (let currentTier = currentGearTier; currentTier <= goalGearTier; currentTier++) {
        if (currentTier < goalGearTier) {
          countUpgrade(gearSlot, currentTier)
          countExp(currentTier)
        }
        if (currentTier === goalGearTier
            && currentGearLevel < goalGearLevel) {
          countExp(currentTier)
        }
      }
    }

    countCost(0, currentSlot1Tier, goalSlot1Tier, currentSlot1Level, goalSlot1Level)
    countCost(1, currentSlot2Tier, goalSlot2Tier, currentSlot2Level, goalSlot2Level)
    countCost(2, currentSlot3Tier, goalSlot3Tier, currentSlot3Level, goalSlot3Level)
    
    return sortItem(totalCost)
  }

  function insertUpdateCost(totalCost, costItem, character) {
    const oldCost = totalCost.find(c => c.type===costItem.type && c.item===costItem.item && c.tier===costItem.tier)
    if (oldCost !== undefined) {
      oldCost.currentGoal = oldCost.currentGoal + costItem.currentGoal
      if (!oldCost.characters.includes(character)) {
        oldCost.characters = [...oldCost.characters, character]
      }
    } else {
      const newCost = {...costItem, currentGoal: costItem.currentGoal, characters: [character]}
      
      totalCost.push(newCost)
    }

    return totalCost
  }

  return { 
    getTotalCost,
    getTotalLevelCost,
    getTotalSkillCost,
    getTotalGearCost,
    getLevelCost,
    getSkillCost,
    getExSkillCost,
    getOtherSkillCost,
    getGearCost,
  }
}
