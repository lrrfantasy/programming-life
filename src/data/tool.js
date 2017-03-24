const tools = [
  {
    type: 'bed',
    icon: 'bed',
    levels: [
      {
        level: 1,
        name: 'Simple Wooden Bed',
        description: 'No special effect',
        buff: {
          maxEnergy: 0
        }
      },
      {
        level: 2,
        name: 'Comfortable Cotton Bed',
        description: 'Increase max energy by 30',
        buff: {
          maxEnergy: 30
        }
      },
      {
        level: 3,
        name: 'High-grade Silk Bed',
        description: 'Increase max energy by 60',
        buff: {
          maxEnergy: 60
        }
      },
      {
        level: 4,
        name: 'Deluxe Velvet Bed',
        description: 'Increase max energy by 150',
        buff: {
          maxEnergy: 100
        }
      },
    ]
  },

  {
    type: 'laptop',
    icon: 'laptop',
    levels: [
      {
        level: 1,
        name: 'Old-style Laptop',
        description: 'Reduce working time by 5%',
        buff: {
          workingTime: 0.05
        }
      },
      {
        level: 2,
        name: 'Modern Laptop',
        description: 'Reduce working time by 10%',
        buff: {
          workingTime: 0.1
        }
      },
      {
        level: 3,
        name: 'Cutting-edge Laptop',
        description: 'Reduce working time by 20%',
        buff: {
          workingTime: 0.2
        }
      },
      {
        level: 4,
        name: 'Futuristic Laptop',
        description: 'Reduce working time by 30%',
        buff: {
          workingTime: 0.3
        }
      },
    ]
  },
  {
    type: 'bathtub',
    icon: 'bathtub',
    levels: [
      {
        level: 1,
        name: 'Stone Bathtub',
        description: 'Increase energy gain from rest by 5%',
        buff: {
          energyGain: 0.05
        }
      },
      {
        level: 2,
        name: 'Ceramic Bathtub',
        description: 'Increase energy gain from rest by 10%',
        buff: {
          energyGain: 0.1
        }
      },
      {
        level: 3,
        name: 'Copper Bathtub',
        description: 'Increase energy gain from rest by 15%',
        buff: {
          energyGain: 0.15
        }
      },
      {
        level: 4,
        name: 'Silver Bathtub',
        description: 'Increase energy gain from rest by 20%',
        buff: {
          energyGain: 0.2
        }
      }
    ]
  }
]

export default tools
export function findToolByNameLevel (tool, level) {
  return !!level ? tools.find(t => t.type === tool).levels[level - 1] : null
}
