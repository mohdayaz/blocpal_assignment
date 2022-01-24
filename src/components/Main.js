import React, {useEffect, useState} from "react"
import {_getToken} from "../Model"
import Content from "./Content"

const Container = () => {
	const [loader, setLoader] = useState(false)
	useEffect(() => {
		getAuthToken()
	}, [])

	const getAuthToken = async () => {
		setLoader(true)
		const clientId = "7c55388e2aca48f281ac0853d44325c6"
		const clientSecret = "99b1adaeb9234e33945397ca1c325721"
		const data = await _getToken(clientId, clientSecret)
		localStorage.setItem("auth_token", data.access_token)
		setLoader(false)
	}

    return <div className='main'>
		{loader ? "Loading ..." : <Content />}
	</div>
};

export default Container