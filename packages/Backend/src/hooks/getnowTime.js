

const getTheCurrentTime =()=>{
    const timeAttestationWasVerified = Math.floor(new Date().getTime() / 1000)

    return timeAttestationWasVerified;
}

module.exports = {getTheCurrentTime}