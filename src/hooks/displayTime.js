const displayTime = (total_seconds) => {
    let seconds = total_seconds % 60
    let minutes = ((total_seconds - seconds) / 60) % 60
    let hours = ((total_seconds - seconds - minutes * 60)) / 3600

    return (hours > 0? (hours < 10? "0" + hours : hours) + ":" : "")
         + (minutes < 10? "0" + minutes : minutes) + ":"
         + (seconds < 10? "0" + seconds : seconds)
}

export default displayTime