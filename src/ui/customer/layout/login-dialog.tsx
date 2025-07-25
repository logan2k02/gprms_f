import { getBackendErrorMessage } from "@/backend";
import { useAlert } from "@/hooks/useAlert";
import { useCustomerAuth } from "@/hooks/useCustomerAuth";
import { useCustomerLoginDialogOpen } from "@/hooks/useCustomerLoginDialogOpen";
import { CustomerAuthService } from "@/services/customer/customer-auth";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { type FC, useState } from "react";
import { useForm } from "react-hook-form";

const LoginForm: FC<{
  open: boolean;
  handleClose: () => void;
  makeReadyToVerify: (pn: string) => void;
}> = ({ handleClose, open, makeReadyToVerify }) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<{ name: string; phone: string }>();

  const { showSuccess, showError } = useAlert();

  const onSubmit = async (data: { name: string; phone: string }) => {
    try {
      const status = await CustomerAuthService.login(
        data.name,
        `+94${data.phone}`
      );
      showSuccess(
        status === "already-sent"
          ? `A verification code has already been sent to +94${data.phone}. Please check your messages.`
          : `Verification code sent to +94${data.phone}. Please check your messages.`
      );
      makeReadyToVerify(data.phone);
      reset();
    } catch (error) {
      showError(
        `Failed to login due to an error: ${getBackendErrorMessage(error)}`
      );
    }
  };

  return (
    <Dialog
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      open={open}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>Login to Your Account</DialogTitle>
      <DialogContent>
        <TextField
          {...register("name", { required: "Name is required" })}
          label="Name"
          placeholder="eg: James Phillips"
          margin="dense"
          fullWidth
          variant="filled"
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          {...register("phone", {
            required: "Phone number is required",
            pattern: {
              value: /^\d{9}$/,
              message:
                "Phone number must be exactly 9 digits. +94 prefix is automatically added.",
            },
          })}
          sx={{ mb: 3 }}
          label="Mobile Number"
          margin="dense"
          fullWidth
          placeholder="eg: 7123456789"
          type="tel"
          variant="filled"
          error={!!errors.phone}
          helperText={errors.phone?.message}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">+94</InputAdornment>
              ),
            },
          }}
        />
        <Typography variant="body2" color="textSecondary">
          Name will be considered only at first login attempt and will not be
          used for future logins. It is used to personalize your experience.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" type="submit" disabled={isSubmitting}>
          Login
        </Button>
        <Button disabled={isSubmitting} type="reset" onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const VerificationDialog: FC<{
  open: boolean;
  handleClose: () => void;
  phoneNumber: string;
}> = ({ handleClose, open, phoneNumber }) => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    reset,
  } = useForm<{ code: string }>();

  const { setAuth } = useCustomerAuth();

  const { showSuccess, showError } = useAlert();

  const onSubmit = async ({ code }: { code: string }) => {
    try {
      const { accessToken, user, customerFound } =
        await CustomerAuthService.verifyLoginCode("+94" + phoneNumber, code);

      if (!customerFound) {
        showSuccess(
          `Welcome to Resto Ease, ${user.name}! You have successfully registered.`
        );
      } else {
        showSuccess(
          `Welcome back, ${user.name}! You have successfully logged in.`
        );
      }

      setAuth({
        accessToken,
        user,
      });

      reset();
      handleClose();
    } catch (error) {
      showError(
        `Failed to login due to an error: ${getBackendErrorMessage(error)}`
      );
    }
  };

  return (
    <Dialog
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      open={open}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>Verification</DialogTitle>
      <DialogContent>
        <TextField
          {...register("code", {
            required: "Verification code is required",
            pattern: {
              value: /^\d{6}$/,
              message: "Verification code must be exactly 6 digits",
            },
          })}
          label="Verification Code"
          placeholder="Enter 6-digit code"
          margin="dense"
          fullWidth
          variant="filled"
          error={!!errors.code}
          helperText={errors.code?.message}
        />
      </DialogContent>
      <DialogActions>
        <Button disabled={isSubmitting} variant="contained" type="submit">
          Verify
        </Button>
        <Button disabled={isSubmitting} onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const LoginDialog: FC = ({}) => {
  const [readyToVerify, setReadyToVerify] = useState("");
  const { isOpen, closeDialog } = useCustomerLoginDialogOpen();

  if (readyToVerify) {
    return (
      <VerificationDialog
        open={isOpen}
        handleClose={() => {
          setReadyToVerify("");
          closeDialog();
        }}
        phoneNumber={readyToVerify}
      />
    );
  }

  return (
    <LoginForm
      open={isOpen}
      handleClose={closeDialog}
      makeReadyToVerify={(v) => setReadyToVerify(v)}
    />
  );
};
