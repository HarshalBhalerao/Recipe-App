import RamenDiningTwoToneIcon from "@mui/icons-material/RamenDiningTwoTone";

const Home = () => {
    return (
    <div className="flex items-center justify-center flex-col ">
        <div className="flex items-center justify-center flex-col">
            <div className = "mb-4 flex items-center border shadow-sm p-4 bg-amber-100 text-amber-700 rounded-full uppercase">
                <RamenDiningTwoToneIcon className="h-6 w-6 mr-2" />
                Best place to post your recipes
            </div>
            <h1 className="text-3xl md:text-6xl bg-gradient-to-r from-teal-600 to-violet-600 text-white px-4 p-2 rounded-md pb-4 w-fit" style={{fontFamily: "cursive"}}>RecipeBook</h1>
            <h1 className="text-3xl md:text-6xl text-center text-neutral-800 mb-6">
                Helps you to share your recipes to the world!
            </h1>
        </div>
        <div>

        </div>
    </div>
    )
};

export default Home;


  