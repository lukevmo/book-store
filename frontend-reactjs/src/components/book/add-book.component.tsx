// Hooks and Types React
import { ChangeEvent, useState } from "react";
// Sweet Alert
import Swal from "sweetalert2";
// Material UI
import { Box, Button, TextField } from '@mui/material';
import { createItem } from "../../services/book.service";
import { IBookData } from "../../types/book.type";
import { useNavigate } from "react-router";
import FooterPage from "../home/footer.component";

const initialDataState: IBookData = {
    _id: null,
    title: "",
    genre: "",
    author: "",
    description: "",
    publicationYear: 0,
    // createdBy?: ""
};

export const AddNewBook = () => {

    const [tutorial, setTutorial] = useState<IBookData>(initialDataState);
    let navigate = useNavigate();

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setTutorial({ ...tutorial, [name]: value });
    };

    const saveTutorial = () => {
        var data = {
            title: tutorial.title,
            genre: tutorial.genre,
            author: tutorial.author,
            publicationYear: Number(tutorial.publicationYear),
            description: tutorial.description
        };
        createItem(data)
            .then(() => {
                Swal.fire(`${data.title} Save Successfully.`, '', 'success');
                navigate("/books");
                setTutorial(initialDataState);
            })
            .catch((e: Error) => {
                Swal.fire('Error', e.message, 'error');
                console.log(e);
            });
    }

    const cancelUpdate = () => {
        navigate("/books");
    };

    return (
        <div className="submit-form text-center">
            <h3>Add new Book</h3>
            <Box component='form' noValidate autoComplete='off' sx={{ '& > :not(style)': { m: 1 } }}>
                <TextField
                    label='Title'
                    name='title'
                    value={tutorial.title}
                    onChange={handleInputChange}
                    fullWidth
                    placeholder="Enter a title"
                />
                <TextField
                    label='Author'
                    name='author'
                    value={tutorial.author}
                    onChange={handleInputChange}
                    fullWidth
                    placeholder="Enter a author"
                />
                <TextField
                    type="number"
                    label='Publication Year'
                    name='publicationYear'
                    value={tutorial.publicationYear}
                    onChange={handleInputChange}
                    fullWidth
                    placeholder="Enter a publicationYear"
                />
                <TextField
                    label='Genre'
                    name='genre'
                    value={tutorial.genre}
                    onChange={handleInputChange}
                    fullWidth
                    placeholder="Enter a genre"
                />
                <TextField
                    label='Description'
                    name='description'
                    value={tutorial.description}
                    onChange={handleInputChange}
                    fullWidth
                    placeholder="Enter a description"
                />
                <Box sx={{ display: 'flex', justifyContent: 'right', '& > :not(style)': { m: 1 } }}>
                    <Button variant='contained' color='success' onClick={saveTutorial}>
                        Create
                    </Button>
                    <Button variant='contained' color='error' onClick={cancelUpdate}>
                        Cancel
                    </Button>
                </Box>
            </Box>
            <FooterPage/>
        </div>
    )
}
