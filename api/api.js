import axios from 'axios'


export const getInvite = async (account) => {
    try {
        const {
            data
        } = await axios.get(`/api/invite/${account}`)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const getInviteRank = async () => {
    try {
        const {
            data
        } = await axios.get(`/api/invite_rank`)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const createInvite = async (account,invite) => {
    try {
        const {data} = await axios.post(`/api/create_invite`, {
                account: account,
                invite: invite
            }
        )
        return data
    } catch (error) {
        console.log(error)
    }
    
}

