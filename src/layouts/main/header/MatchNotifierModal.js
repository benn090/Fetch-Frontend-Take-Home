import * as React from 'react';
// @mui
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Avatar, Button, Container, Link, Stack } from '@mui/material';

// -----------------------------------------------------------

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  maxWidth: '95%',
  transform: 'translate(-50%, -50%)',
  width: 360,
  bgcolor: 'background.paper',
  borderRadius: 1,
  boxShadow: 24,
  p: 4,
};


export default function MatchNotifierModal({ openModal, onCloseModal, matchedDog }) {


  return (
    <>
      
      <Modal
        open={openModal}
        onClose={onCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container sx={style} >

			<Stack alignItems="center" sx={{ mb: 1 }}>

						<Typography id="modal-modal-title" variant="h6" component="h2">
							Congratulations!
						</Typography>

						<Typography id="modal-modal-title" variant="subtitle2" sx={{ color: 'text.disabled'}} >
							You have a Match
						</Typography>

						<Avatar
							alt="Remy Sharp"
							src={matchedDog.img}
							sx={{ width: 100, height: 100, mt: 3 }}
						/>

					</Stack>

					<Stack alignItems="center" direction={"row"} justifyContent={"center"} sx={{ mt: 2 }}>
						<Link color="#300D38" underline="hover">
							<Typography variant="h6" noWrap>
								{matchedDog.name},&nbsp;
							</Typography>
						</Link>

						<Typography variant="subtitle2" noWrap>
							{matchedDog.age}
						</Typography>

					</Stack>

					<Stack alignItems="center">
          
						<Typography variant="subtitle2" noWrap>
							{matchedDog.breed}
						</Typography>
						
						<Typography variant="subtitle2">
							Zip code: {matchedDog.zip_code}
						</Typography>

						<Button disableElevation variant="contained" sx={{ px: 6, mt: 3}} onClick={onCloseModal}>
							Close
						</Button>

					</Stack>
          
        </Container>
      </Modal>
			
    </>
  );
}