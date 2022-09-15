import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ModalCreate({ modalCreate, setModalCreate, addUser }) {
  return (
    <div>
      <Modal
        open={modalCreate}
        onClose={() => setModalCreate(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure to add user?
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{
              mt: 2,
              display: "flex",
              justifyContent: "flex-end",
              gap: "20px",
            }}
          >
            <Button
              variant="contained"
              color="warning"
              onClick={() => setModalCreate(false)}
            >
              Cancel
            </Button>
            <Button variant="contained" onClick={addUser}>
              Add
            </Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
