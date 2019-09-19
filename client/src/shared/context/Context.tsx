export interface IContextProps {
  state: any
  dispatch: ({ type }: { type: string }) => void
}
