import {ReactNode} from 'react';

export interface StepLayoutProps{
    submitHandler: (e: any) => void;
    children?: ReactNode
}

export interface StepProps{
    nextStep: (param: string) => void;
    param?: string;
}
