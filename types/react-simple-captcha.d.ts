declare module 'react-simple-captcha' {
  export function loadCaptchaEnginge(numberOfCharacters: number, backgroundColor?: string, fontColor?: string, charMap?: string): void
  export function LoadCanvasTemplate(props: { reloadText?: string; reloadColor?: string }): JSX.Element
  export function LoadCanvasTemplateNoReload(props?: object): JSX.Element
  export function validateCaptcha(userValue: string, reload?: boolean): boolean
}
