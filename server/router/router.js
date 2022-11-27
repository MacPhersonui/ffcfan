
export default function (router, handle) {
    /** api **/
    router.get("/api/get_ido_data", require("../container/ido.js").getIDOData)
    
    // Default catch-all handler to allow Next.js to handle all other routes
    router.all("*", (req, res) => handle(req, res))
}