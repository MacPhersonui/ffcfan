
export default function (router, handle) {
    /** api **/
    router.get("/api/invite/:account", require("../container/invite.js").invite)
    router.get("/api/invite_rank", require("../container/invite.js").inviteRank)
    router.post("/api/create_invite", require("../container/invite.js").createInvite)

    router.get("/api/tree/:account", require("../container/invite.js").tree)
    
    // Default catch-all handler to allow Next.js to handle all other routes
    router.all("*", (req, res) => handle(req, res))
}