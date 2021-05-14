const express = require('express');
const fs = require('fs');

const app = express();
const port = 3001;

//middleware
app.use(express.json()); 


const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/data/tours-simple.json`, 'utf-8')); 

const getAllTours = (req,res) => {
    res.status(200).json({
        status : 'sucess',
        results : tours.length,
        data :{
            tours
        }
    });
};

const getTour = (req,res) => {
    console.log(req.params);
    const id = req.params.id *1;
    if( id >= tours.length ){
        res.status(404).json({
            status: 'fail',
            message: 'Invalid Input'
        });
    }
    else{
        const tour = tours.find( el => el.id === id );
        res.status(200).json({
            status : 'sucess',
            results : tours.length,
            data :{
                tour
            }
        });
    }  
};

const createTour = (req,res) => {
    console.log(req.body);
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({id: newId}, req.body);
    tours.push(newTour);
    console.log(tours);
    fs.writeFile(`./data/tours-simple.json`, JSON.stringify(tours), (err) =>{
        if(err) console.log("Got some error.. ");
        console.log("New tour added..");
    }) ;
    res.status(201).json({
        status : 'success',
        results: tours.length,
        data : {
            newTour
        }
    });
};

const updateTour = (req,res) => {
    if( ( req.params.id * 1 ) >= tours.length ){
        res.status(404).json({
            status: 'fail',
            message: 'Invalid Input'
        });
    }
    else{
        res.status(200).json({
            status: 'sucess',
            data : {
                tours : ' Updated tour here.. '
            }
        });
    }
};

const deleteTour = (req,res) => {
    if( ( req.params.id * 1 ) >= tours.length ){
        res.status(404).json({
            status: 'fail',
            message: 'Invalid Input'
        });
    }
    else{
        res.status(204).json({
            status: 'sucess',
        });
    }
};

// app.get( '/api/v1/tours/', getAllTours);
// app.get( '/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours/', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

app
    .route('/api/v1/tours/')
    .get(getAllTours)
    .post(createTour);

app
    .route('/api/v1/tours/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour);



app.listen(port, () => {
    console.log(`Listening to the port ${port}`);
});

