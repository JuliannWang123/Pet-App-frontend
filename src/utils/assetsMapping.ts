type PetAnimationState = 'happy' | 'sad' | 'jump' | 'run' | 'walk';

// Define the shape of each cosmetic's frames
interface CosmeticDefinition {
  happy: any[];
  sad: any[];
  jump: any[];
  run: any[];
  walk: any[];
}

type CosmeticFramesMap = Record<string, CosmeticDefinition>;

export const cosmeticFrames: CosmeticFramesMap = {
    default: {
      happy: [
        require('../assets/happy/FA_TEDDY_Idle_Blink_001.png'),
        require('../assets/happy/FA_TEDDY_Idle_Blink_002.png'),
        require('../assets/happy/FA_TEDDY_Idle_Blink_003.png'),
        require('../assets/happy/FA_TEDDY_Idle_Blink_004.png'),
        require('../assets/happy/FA_TEDDY_Idle_Blink_005.png'),
        require('../assets/happy/FA_TEDDY_Idle_Blink_006.png'),
        require('../assets/happy/FA_TEDDY_Idle_Blink_007.png'),
        require('../assets/happy/FA_TEDDY_Idle_Blink_008.png'),
        require('../assets/happy/FA_TEDDY_Idle_Blink_009.png'),
        require('../assets/happy/FA_TEDDY_Idle_Blink_010.png'),
        require('../assets/happy/FA_TEDDY_Idle_Blink_011.png'),
      ],
      sad: [
        require('../assets/sad/FA_TEDDY_Hurt_Dizzy_001.png'),
        require('../assets/sad/FA_TEDDY_Hurt_Dizzy_002.png'),
        require('../assets/sad/FA_TEDDY_Hurt_Dizzy_003.png'),
        require('../assets/sad/FA_TEDDY_Hurt_Dizzy_004.png'),
        require('../assets/sad/FA_TEDDY_Hurt_Dizzy_005.png'),
        require('../assets/sad/FA_TEDDY_Hurt_Dizzy_006.png'),
        require('../assets/sad/FA_TEDDY_Hurt_Dizzy_007.png'),
        require('../assets/sad/FA_TEDDY_Hurt_Dizzy_008.png'),
        require('../assets/sad/FA_TEDDY_Hurt_Dizzy_009.png'),
      ],
      jump: [
        require('../assets/jump/FA_TEDDY_Jump_UP_001.png'),
        require('../assets/jump/FA_TEDDY_Jump_UP_002.png'),
        require('../assets/jump/FA_TEDDY_Jump_UP_003.png'),
        require('../assets/jump/FA_TEDDY_Jump_UP_004.png'),
      ],
      run: [
        require('../assets/run/FA_TEDDY_Run_000.png'),
        require('../assets/run/FA_TEDDY_Run_001.png'),
        require('../assets/run/FA_TEDDY_Run_002.png'),
        require('../assets/run/FA_TEDDY_Run_003.png'),
        require('../assets/run/FA_TEDDY_Run_004.png'),
        require('../assets/run/FA_TEDDY_Run_005.png'),
        require('../assets/run/FA_TEDDY_Run_006.png'),
        require('../assets/run/FA_TEDDY_Run_007.png'),
        require('../assets/run/FA_TEDDY_Run_008.png'),
        require('../assets/run/FA_TEDDY_Run_009.png'),
      ],
      walk: [
        require('../assets/walk/FA_TEDDY_Walk_Happy_000.png'),
        require('../assets/walk/FA_TEDDY_Walk_Happy_001.png'),
        require('../assets/walk/FA_TEDDY_Walk_Happy_002.png'),
        require('../assets/walk/FA_TEDDY_Walk_Happy_003.png'),
        require('../assets/walk/FA_TEDDY_Walk_Happy_004.png'),
        require('../assets/walk/FA_TEDDY_Walk_Happy_005.png'),
        require('../assets/walk/FA_TEDDY_Walk_Happy_006.png'),
        require('../assets/walk/FA_TEDDY_Walk_Happy_007.png'),
        require('../assets/walk/FA_TEDDY_Walk_Happy_008.png'),
        require('../assets/walk/FA_TEDDY_Walk_Happy_009.png'),
        require('../assets/walk/FA_TEDDY_Walk_Happy_010.png'),
        require('../assets/walk/FA_TEDDY_Walk_Happy_011.png'),
      ],
    },
  

    bunny1: {
      happy: [
        require('../assets/Bunny1/happy/__Bunny1_Idle_000.png'),
        require('../assets/Bunny1/happy/__Bunny1_Idle_001.png'),
        require('../assets/Bunny1/happy/__Bunny1_Idle_002.png'),
        require('../assets/Bunny1/happy/__Bunny1_Idle_003.png'),
        require('../assets/Bunny1/happy/__Bunny1_Idle_004.png'),
        require('../assets/Bunny1/happy/__Bunny1_Idle_005.png'),
        require('../assets/Bunny1/happy/__Bunny1_Idle_006.png'),
        require('../assets/Bunny1/happy/__Bunny1_Idle_007.png'),
        require('../assets/Bunny1/happy/__Bunny1_Idle_008.png'),
        require('../assets/Bunny1/happy/__Bunny1_Idle_009.png'),
      ],
      sad: [
        require('../assets/Bunny1/sad/__Bunny1_Hurt_000.png'),
        require('../assets/Bunny1/sad/__Bunny1_Hurt_001.png'),
        require('../assets/Bunny1/sad/__Bunny1_Hurt_002.png'),
        require('../assets/Bunny1/sad/__Bunny1_Hurt_003.png'),
        require('../assets/Bunny1/sad/__Bunny1_Hurt_004.png'),
      ],
      jump: [
        require('../assets/Bunny1/jump/__Bunny1_Rolling_000.png'),
        require('../assets/Bunny1/jump/__Bunny1_Rolling_001.png'),
        require('../assets/Bunny1/jump/__Bunny1_Rolling_002.png'),
        require('../assets/Bunny1/jump/__Bunny1_Rolling_003.png'),
        require('../assets/Bunny1/jump/__Bunny1_Rolling_004.png'),
        require('../assets/Bunny1/jump/__Bunny1_Rolling_005.png'),
        require('../assets/Bunny1/jump/__Bunny1_Rolling_006.png'),
        require('../assets/Bunny1/jump/__Bunny1_Rolling_007.png'),
        require('../assets/Bunny1/jump/__Bunny1_Rolling_008.png'),
        require('../assets/Bunny1/jump/__Bunny1_Rolling_009.png'),
      ],
      run: [
        require('../assets/Bunny1/run/__Bunny1_Run_000.png'),
        require('../assets/Bunny1/run/__Bunny1_Run_001.png'),
        require('../assets/Bunny1/run/__Bunny1_Run_002.png'),
        require('../assets/Bunny1/run/__Bunny1_Run_003.png'),
        require('../assets/Bunny1/run/__Bunny1_Run_004.png'),
        require('../assets/Bunny1/run/__Bunny1_Run_005.png'),
        require('../assets/Bunny1/run/__Bunny1_Run_006.png'),
        require('../assets/Bunny1/run/__Bunny1_Run_007.png'),
      ],
      walk: [
        require('../assets/Bunny1/walk/__Bunny1_Back_000.png'),
        require('../assets/Bunny1/walk/__Bunny1_Back_001.png'),
        require('../assets/Bunny1/walk/__Bunny1_Back_002.png'),
        require('../assets/Bunny1/walk/__Bunny1_Back_003.png'),
        require('../assets/Bunny1/walk/__Bunny1_Back_004.png'),
        require('../assets/Bunny1/walk/__Bunny1_Back_005.png'),
        require('../assets/Bunny1/walk/__Bunny1_Back_006.png'),
        require('../assets/Bunny1/walk/__Bunny1_Back_007.png'),
        require('../assets/Bunny1/walk/__Bunny1_Back_008.png'),
        require('../assets/Bunny1/walk/__Bunny1_Back_009.png'),
      ],
    },

    cat1: {
      happy: [
        require('../assets/cat1/happy/__Cat_Idle_000.png'),
        require('../assets/cat1/happy/__Cat_Idle_001.png'),
        require('../assets/cat1/happy/__Cat_Idle_002.png'),
        require('../assets/cat1/happy/__Cat_Idle_003.png'),
        require('../assets/cat1/happy/__Cat_Idle_004.png'),
        require('../assets/cat1/happy/__Cat_Idle_005.png'),
        require('../assets/cat1/happy/__Cat_Idle_006.png'),
        require('../assets/cat1/happy/__Cat_Idle_007.png'),
        require('../assets/cat1/happy/__Cat_Idle_008.png'),
        require('../assets/cat1/happy/__Cat_Idle_009.png'),
        require('../assets/cat1/happy/__Cat_Idle_010.png'),
        require('../assets/cat1/happy/__Cat_Idle_011.png'),
      ],
      sad: [
        require('../assets/cat1/sad/__Cat_Hurt_000.png'),
        require('../assets/cat1/sad/__Cat_Hurt_001.png'),
        require('../assets/cat1/sad/__Cat_Hurt_002.png'),
        require('../assets/cat1/sad/__Cat_Hurt_003.png'),
        require('../assets/cat1/sad/__Cat_Hurt_004.png'),
        require('../assets/cat1/sad/__Cat_Hurt_005.png'),
      ],
      jump: [
        require('../assets/cat1/jump/__Cat_JumpUp_000.png'),
        require('../assets/cat1/jump/__Cat_JumpUp_001.png'),
        require('../assets/cat1/jump/__Cat_JumpUp_002.png'),
        require('../assets/cat1/jump/__Cat_JumpUp_003.png'),
        require('../assets/cat1/jump/__Cat_JumpUp_004.png'),
      ],
      run: [
        require('../assets/cat1/run/__Cat_Run_000.png'),
        require('../assets/cat1/run/__Cat_Run_001.png'),
        require('../assets/cat1/run/__Cat_Run_002.png'),
        require('../assets/cat1/run/__Cat_Run_003.png'),
        require('../assets/cat1/run/__Cat_Run_004.png'),
        require('../assets/cat1/run/__Cat_Run_005.png'),
        require('../assets/cat1/run/__Cat_Run_006.png'),
        require('../assets/cat1/run/__Cat_Run_007.png'),
        require('../assets/cat1/run/__Cat_Run_008.png'),
        require('../assets/cat1/run/__Cat_Run_009.png'),
      ],
      walk: [
        require('../assets/cat1/walk/__Cat_JumpFall_000.png'),
        require('../assets/cat1/walk/__Cat_JumpFall_001.png'),
        require('../assets/cat1/walk/__Cat_JumpFall_002.png'),
        require('../assets/cat1/walk/__Cat_JumpFall_003.png'),
        require('../assets/cat1/walk/__Cat_JumpFall_004.png'),
      ],
    },
  };
  