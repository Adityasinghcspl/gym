// RESTful API
export const RESTServerRoute = {
	// Trainer Routes
	REST_SIGNIN_TRAINER: 'api/trainer/login',
	REST_SIGNUP_TRAINER: 'api/trainer/register',
	REST_All_TRAINERS: 'api/trainer',
	REST_TRAINER: (id: string) => `api/trainer/${id}`,
	REST_GET_TRAINER: (id: string) => `api/trainer/${id}`,
	REST_UPDATE_TRAINER: (id: string) => `api/trainer/${id}`,
	REST_DELETE_TRAINER: (id: string) => `api/trainer/${id}`,
	REST_SEND_RESET_PASSWORD_LINK_TRAINER: '/api/trainer/password-reset',
	REST_RESET_PASSWORD_TRAINER: (id: string, token: string) => `/api/trainer/password-reset/${id}/${token}`,
	REST_UPDATE_PASSWORD_TRAINER: (id: string) => `api/trainer/update/password/${id}`,

	// User Routes
	REST_SIGNIN_USER: 'api/user/login',
	REST_SIGNUP_USER: 'api/user/register',
	REST_All_USERS: 'api/user',
	REST_USER: (id: string) => `api/user/${id}`,
	REST_GET_USER: (id: string) => `api/user/${id}`,
	REST_UPDATE_USER: (id: string) => `api/user/${id}`,
	REST_DELETE_USER: (id: string) => `api/user/${id}`,
	REST_SEND_RESET_PASSWORD_LINK_USER: '/api/user/password-reset',
	REST_RESET_PASSWORD_USER: (id: string, token: string) => `/api/user/password-reset/${id}/${token}`,
	REST_UPDATE_PASSWORD_USER: (id: string) => `api/user/update/password/${id}`,

	// MemberShip Routes
	REST_All_MEMBERSHIPS: 'api/membership',
	REST_CREATE_MEMBERSHIP: "api/membership", // POST
	REST_MEMBERSHIP_BY_ID: (id: string) => `api/membership/${id}`, // GET one
	REST_UPDATE_MEMBERSHIP: (id: string) => `api/membership/${id}`, // PUT
	REST_DELETE_MEMBERSHIP: (id: string) => `api/membership/${id}`,  // DELETE

	// User attendance Routes
	REST_ALL_ATTENDANCE: "/attendance",
	REST_CREATE_ATTENDANCE: "/attendance/checkin",
	REST_UPDATE_ATTENDANCE: "/attendance/checkout",
	REST_DELETE_ATTENDANCE: (id: string) => `/attendance/${id}`,

}