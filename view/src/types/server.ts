// RESTful API
export const RESTServerRoute = {

	REST_SIGNIN_TRAINER: 'api/trainer/login',
	REST_SIGNUP_TRAINER: 'api/trainer/register',
	REST_All_TRAINERS: 'api/trainer',
	REST_TRAINER: (id: string) => `api/trainer/${id}`,
	REST_GET_TRAINER: (id: string) => `api/trainer/${id}`,
	REST_UPDATE_TRAINER: (id: string) => `api/trainer/${id}`,
	REST_DELETE_TRAINER: (id: string) => `api/trainer/${id}`,
	REST_UPDATE_PASSWORD_TRAINER: (id: string) => `api/trainerr/update/password/${id}`,

	REST_SIGNIN_USER: 'api/user/login',
	REST_SIGNUP_USER: 'api/user/register'

}