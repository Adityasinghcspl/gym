import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AccessToken, SignInTrainerForm } from "../../../types/type";
import { RestClientBuilder } from "../../../utils/RestClient";
import { RESTServerRoute } from "../../../types/server";
import { authState } from "../../../types/slice";
import config from "../../../config/config";

const initialState: authState = {
  signUpTrainer: {
    data: null,
    loading: false,
    error: null
  },
  signInTrainer: {
    data: null,
    loading: false,
    error: null
  },
  signUpUser:{
    data: null,
    loading: false,
    error: null
  },
  signInUser:{
    data: null,
    loading: false,
    error: null
  }
};


// Define an async thunk for sign-in action
export const signInTrainer = createAsyncThunk<AccessToken, any>('api/trainer/register', async (sighInData: SignInTrainerForm) => {
  try {
    const data = await RestClientBuilder.instance()
      .withBaseUrl(`${config.API_REST_ENDPOINT}`)
      .build()
      .post<AccessToken>(RESTServerRoute.REST_SIGNIN_TRAINER, sighInData);
    return data;
  } catch (error: any) {
    throw error;
  }
});

// Define an async thunk for verification action(OTP verification)
// export const signInWithCredential = createAsyncThunk(
//   'authentication/verification',
//   async ({ verificationId, verificationCode }: { verificationId: string; verificationCode: string }) => {
//     try {
//       const credential = auth.PhoneAuthProvider.credential(verificationId, verificationCode);
//       await auth().signInWithCredential(credential);
//       // Get the user token
//       const currentUser = auth().currentUser;
//       if (currentUser) {
//         const userToken = await currentUser.getIdToken();
//         // Make API call to generate identity token
//         const tenant = await getTenantSubDomain();
//         const requestBody = {
//           acceptEula: true,
//           identityToken: userToken,
//           tenant: tenant,
//           captcha: ''
//         };
//         const data = await RestClientBuilder.instance()
//           .withBaseUrl(Config.API_REST_ENDPOINT)
//           .build()
//           .post<{ token: string }>(RESTServerRoute.REST_SIGNIN_FIREBASE, requestBody);

//         const token = data.token;
//         const decodedToken = jwtDecode(token) as UserToken;
//         if (decodedToken?.name !== 'Unknown') {
//           try {
//             const fcmToken = await messaging().getToken();
//             const requestbody = {
//               mobileToken: fcmToken,
//               mobileOS: Platform.OS,
//               mobileAppName: getApplicationName(),
//               mobileVersion: getVersion(),
//               mobileBundleID: getBundleId()
//             };
//             await RestClientBuilder.instance()
//               .withBaseUrl(Config.API_REST_ENDPOINT)
//               .withHeader('Authorization', token)
//               .build()
//               .put(`/v1/api/users/${decodedToken?.id}/mobile-data`, requestbody);

//             await storeAsyncData(tenant, {
//               mobile: decodedToken?.mobile,
//               email: decodedToken?.email,
//               tenantSubDomain: tenant,
//               token: token,
//               locale: decodedToken.locale,
//               currency: decodedToken.currency
//             });
//             return 'Home' as OnboardUserReturnType;
//           } catch (error: any) {
//             const errorMessage = handleHttpError(error);
//             crashlytics().recordError(new Error(`Signin with verify otp number error: ${error}`));
//             throw errorMessage;
//           }
//         }
//         return 'Profile' as OnboardUserReturnType;
//       }
//     } catch (error: any) {
//       const errorMessage = handleHttpError(error?.code);
//       crashlytics().recordError(new Error(`Signin with otp number error: ${error}`));
//       throw errorMessage;
//     }
//   }
// );

// Define an async thunk for onboardUser/Create new users action
// export const onboardUser = createAsyncThunk(
//   'authentication/onboardUser',
//   async ({
//     mobile,
//     email,
//     firstName,
//     name,
//     locale,
//     tenant
//   }: {
//     mobile: string;
//     email: string;
//     firstName: string;
//     name: string;
//     locale: string;
//     tenant: string;
//   }) => {
//     try {
//       const requestBody = { mobile, email, firstName, name, locale, tenant };

//       // Make API call to create a profile
//       const data = await RestClientBuilder.instance()
//         .withBaseUrl(Config.API_REST_ENDPOINT)
//         .build()
//         .post<{ token: string }>(RESTServerRoute.REST_FIREBASE_ONBOARD, requestBody);
//       const token = data.token;
//       const decodedToken = jwtDecode(token) as UserToken;
//       await storeAsyncData(tenant, {
//         mobile,
//         email,
//         tenantSubDomain: tenant,
//         token: token,
//         locale: locale,
//         currency: decodedToken.currency
//       });
//       // Ensure the return type is one of the expected values
//       return 'Verification' as OnboardUserReturnType;
//     } catch (error: any) {
//       const errorMessage = handleHttpError(error?.request?.status);
//       crashlytics().recordError(new Error(`onboard user error: ${error}`));
//       throw errorMessage;
//     }
//   }
// );

const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    // Define synchronous actions here if needed
    clearAuthError: state => {
      state.signInTrainer.error = null;
      state.signUpTrainer.error = null;
      state.signInUser.error = null;
      state.signUpUser.error = null;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(signInTrainer.pending, state => {
        state.signInTrainer.loading = true;
        state.signInTrainer.error = null;
      })
      .addCase(signInTrainer.fulfilled, (state, action) => {
        state.signInTrainer.loading = false;
        state.signInTrainer.data = action.payload;
      })
      .addCase(signInTrainer.rejected, (state, action) => {
        state.signInTrainer.loading = false;
        state.signInTrainer.error = action.error.message;
      })
      // .addCase(logout.fulfilled, () => initialState);
  }
});
export const { clearAuthError } = authSlice.actions;
export default authSlice.reducer;
