const ext = {
  hasOpener: function () {
    try {
      return window.opener && (window.opener.id || window.opener.deal)
    } catch (err) {
      return null
    }
  },
  getWindow: function () {
    return window
  }
}

export default ext
