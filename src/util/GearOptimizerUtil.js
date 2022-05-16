import CostUtil from './CostUtil';
import stageData from '../resource/stageData.json'

export default function GearOptimizerUtil() {
  const { getTotalGearCost } = CostUtil()

  function getOptimizeStageData() {
    let optimizeStages = []

    stageData.forEach(stage => {
      let score = 0
      let drops = []
      let characters = []
      stage.drops.forEach(drop => {
        const cost = getTotalGearCost().find(cost => cost.type === drop.type 
                                      && cost.item === drop.item
                                      && cost.tier === drop.tier)
        if (cost !== undefined) {
          score = score + (cost.currentGoal * drop.chance)
          drops.push(drop)
          characters = characters.concat(cost.characters
                                          .filter((char) => characters.indexOf(char) < 0));
        }
      })
      if (score > 0) {
        optimizeStages.push({...stage, drops: drops, score: score, characters: characters})
      }
    });

    return optimizeStages.sort((a,b) => {
      const scoreA = a.score
      const scoreB = b.score
      if (scoreA > scoreB) return -1;
      if (scoreA < scoreB) return 1;
      return 0;
    })
  }

  return {
    getOptimizeStageData
  }
}
