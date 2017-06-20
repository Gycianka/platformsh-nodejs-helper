// Decode Base64 string and parse JSON.
const readBase64Json = (value) => {
  if (!value) {
    return undefined;
  }

  try {
    return JSON.parse(new Buffer(value, 'base64').toString());
  } catch (err) {
    return undefined;
  }
};

// Reads Platform.sh configuration from environment and returns a single object.
const config = () => {
  if (!process.env.PLATFORM_PROJECT) {
    return false;
  }

  return {
    application: readBase64Json(process.env.PLATFORM_APPLICATION),
    relationships: readBase64Json(process.env.PLATFORM_RELATIONSHIPS),
    variables: readBase64Json(process.env.PLATFORM_VARIABLES),
    application_name: process.env.PLATFORM_APPLICATION_NAME,
    app_dir: process.env.PLATFORM_APP_DIR,
    environment: process.env.PLATFORM_ENVIRONMENT,
    project: process.env.PLATFORM_PROJECT,
    routes: readBase64Json(process.env.PLATFORM_ROUTES),
    tree_id: process.env.PLATFORM_TREE_ID,
    project_entropy: process.env.PLATFORM_PROJECT_ENTROPY,
    branch: process.env.PLATFORM_BRANCH,
    document_root: process.env.PLATFORM_DOCUMENT_ROOT,
    port: process.env.PORT
  };
};

module.exports = {
  config
};
