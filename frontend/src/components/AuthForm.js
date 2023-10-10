import {
  Form,
  useSearchParams,
  Link,
  useActionData,
  useNavigation,
} from "react-router-dom";

import classes from "./AuthForm.module.css";

function AuthForm() {
  const data = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [searchparams] = useSearchParams();
  const isLogin = searchparams.get("mode") === "signup";
  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? "Create a new user" : "Login"}</h1>
        {data && data.errors && (
          <ul>
            {Object.keys(data.errors).map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}
        {data && data.message && <p>{data.message}</p>}
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
          <Link to={`?mode=${isLogin ? "login" : "signup"}`}>
            {isLogin ? "Login" : "Create new User"}
          </Link>
          <button disabled={isSubmitting}>
            {isSubmitting ? "submitting" : "Save"}
          </button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
