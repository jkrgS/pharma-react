import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { Switch } from 'antd';

const Copyright = () => (
  <Typography variant="body2" color="textSecondary" align="center">
    {'Copyright © '}
    <Link color="inherit" href="https://material-ui.com/">
      {process.env.REACT_APP_APP_NAME}
    </Link>{' '}
    {new Date().getFullYear()}
    {'.'}
  </Typography>
);

const LoginFields = ({ onChange }) => (
  <>
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      id="email"
      label="Email Address"
      name="email"
      autoComplete="email"
      autoFocus
      onChange={(e) => onChange(e)}
    />
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      name="password"
      label="Password"
      type="password"
      id="password"
      autoComplete="current-password"
      onChange={(e) => onChange(e)}
    />
    <FormControlLabel
      control={
        <Checkbox id="remember" onChange={(e) => onChange(e)} color="primary" />
      }
      label="Remember me"
      id="remember"
    />
  </>
);

const RegisterFields = ({ onChange }) => (
  <>
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      id="firstName"
      label="First Name"
      name="first-name"
      autoComplete="firstName"
      onChange={(e) => onChange(e)}
      autoFocus
    />
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      id="lastName"
      label="Last Name"
      name="last-name"
      autoComplete="lastName"
      onChange={(e) => onChange(e)}
      autoFocus
    />
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      id="email"
      label="Email Address"
      name="email"
      autoComplete="email"
      onChange={(e) => onChange(e)}
      autoFocus
    />
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      name="password"
      label="Password"
      type="password"
      id="password"
      onChange={(e) => onChange(e)}
    />
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      name="confirm-password"
      label="Confirm Password"
      type="password"
      id="confirmPassword"
      onChange={(e) => onChange(e)}
    />
  </>
);

const ForgotFields = ({ onChange }) => (
  <TextField
    variant="outlined"
    margin="normal"
    required
    fullWidth
    id="email"
    label="Email Address"
    name="email"
    autoComplete="email"
    autoFocus
    onChange={(e) => onChange(e)}
  />
);

const ResetFields = ({ onChange }) => (
  <>
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      name="password"
      label="Password"
      type="password"
      id="password"
      onChange={(e) => onChange(e)}
    />
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      name="confirm-password"
      label="Confirm Password"
      type="password"
      id="confirmPassword"
      onChange={(e) => onChange(e)}
    />
  </>
);

const EditTermFields = ({ onChange, term }) => (
  <>
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      id="label"
      label="Name"
      name="name"
      value={term?.label || ''}
      onChange={(e) => onChange(e)}
      autoFocus
    />
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      multiline
      id="synonyms"
      label="Synonyms"
      name="synonyms"
      value={term?.synonyms || ''}
      onChange={(e) => onChange(e)}
    />
    <TextField
      variant="outlined"
      margin="normal"
      fullWidth
      id="term_editor"
      label="Editor"
      name="term_editor"
      value={term?.term_editor || ''}
      onChange={(e) => onChange(e)}
    />
  </>
);

const CreateTermFields = ({ onChange }) => (
  <>
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      id="obo_id"
      label="Code"
      name="obo_id"
      onChange={(e) => onChange(e)}
      autoFocus
    />
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      id="label"
      label="Name"
      name="name"
      onChange={(e) => onChange(e)}
    />
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      multiline
      id="synonyms"
      label="Synonyms"
      name="synonyms"
      onChange={(e) => onChange(e)}
    />
    <TextField
      variant="outlined"
      margin="normal"
      fullWidth
      id="term_editor"
      label="Editor"
      name="term_editor"
      onChange={(e) => onChange(e)}
    />
    <FormControlLabel
      control={
        <Switch
          style={{ marginLeft: '1rem' }}
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          defaultChecked={false}
        />
      }
      label="Has children"
      labelPlacement="start"
      style={{ marginLeft: 0 }}
      onChange={(e) => onChange({ switch: e })}
      id="has_children"
    />
  </>
);

export const forms = {
  Copyright,
  LoginFields,
  RegisterFields,
  ForgotFields,
  ResetFields,
  EditTermFields,
  CreateTermFields,
};
