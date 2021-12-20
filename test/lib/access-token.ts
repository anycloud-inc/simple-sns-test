let _token: string | null = null

export const AccessToken = {
  get: () => _token,
  set: (val: string) => {
    _token = val
  },
}
