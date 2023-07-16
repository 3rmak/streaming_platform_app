import { PlayPauseActionEnum } from "./play_pause.action.enum";

export class PlayPauseEmitDto {
    time!: number;
    action!: PlayPauseActionEnum;
}