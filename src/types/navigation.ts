export type ScreenId =
  | 'ready'
  | 'straight'
  | 'turn_right'
  | 'elevator_up'
  | 'exit_elevator_left'
  | 'arrived_checkin'
  | 'next_task_exam'
  | 'voice_listening'
  | 'voice_response_restroom'
  | 'nav_restroom'
  | 'rerouting_notice'
  | 'return_info_desk'
  | 'unwell_help'
  | 'visit_complete_return';

export type GraphicType =
  | 'ready_badge'
  | 'arrow_straight'
  | 'arrow_turn_right'
  | 'elevator_5'
  | 'arrow_exit_left'
  | 'kiosk_checkin'
  | 'lab_blood'
  | 'voice_waveform'
  | 'restroom_confirm'
  | 'restroom_walk'
  | 'reroute_compass'
  | 'info_desk'
  | 'unwell_rest'
  | 'complete_star';

export interface ScreenData {
  id: ScreenId;
  orderNumber: number;
  category: 'main' | 'voice_branch' | 'reroute_branch' | 'emergency_branch';
  titleCN: string;
  titleEN: string;
  primaryInstructionCN: string;
  primaryInstructionEN: string;
  secondaryInstructionCN?: string;
  secondaryInstructionEN?: string;
  destinationTagCN?: string;
  destinationTagEN?: string;
  floorTagCN?: string;
  floorTagEN?: string;
  graphicType: GraphicType;
  buttonPromptCN: string;
  buttonPromptEN: string;
  audioPromptCN: string;
  audioPromptEN: string;
  defaultNextId: ScreenId;
  accessibleNotesCN: string;
  accessibleNotesEN: string;
}

export type ScenarioType = 'main_flow' | 'restroom_voice' | 'lost_reroute' | 'emergency_unwell';
