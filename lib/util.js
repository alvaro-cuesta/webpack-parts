exports.getCurrentGitRevision = function getCurrentGitRevision(directory) {
  try {
    const gitDirectory = path.join(directory, '.git')

    if (!fs.existsSync(gitDirectory)) {
      return undefined
    }

    const head = fs.readFileSync(path.join(gitDirectory, 'HEAD'), { encoding: 'utf8' })
    const maybeRef = head.match(/ref: (.+)/)

    if (maybeRef !== null) {
      const refPath = path.join(gitDirectory, ...maybeRef[1].split('/'))
      return fs.readFileSync(refPath, { encoding: 'utf8' }).trim()
    }

    const maybeCommit = head.match(/([0-9a-f]{40})/)[1]
    if (maybeCommit !== null) {
      return maybeCommit.trim()
    }

    return undefined
  } catch (e) {
    console.error('Error getting Git revision:', e)
    return undefined
  }
}
