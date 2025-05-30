// High Score REST API URL (the relative path to the api endpoint is required for "expo go" to work properly)
export const HIGH_SCORE_API_URL = process.env.NODE_ENV === "development" ? "/api/high-score" : `${process.env.EXPO_PUBLIC_WEBSITE_URL}/api/high-score`;
