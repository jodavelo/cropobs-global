
import { GliderComponent } from "../../ui/glider"
import { v4 as uuidv4 } from 'uuid';
import { CardNew } from "./";

const news = [
    {
        ago_text: "",
        title: "",
        description: "",
        image_url: ""
    },
    {
        ago_text: "",
        title: "",
        description: "",
        image_url: ""
    },
    {
        ago_text: "",
        title: "",
        description: "",
        image_url: ""
    },
    {
        ago_text: "",
        title: "",
        description: "",
        image_url: ""
    },
    {
        ago_text: "",
        title: "",
        description: "",
        image_url: ""
    },
    {
        ago_text: "",
        title: "",
        description: "",
        image_url: ""
    },
]

export const NewsContainer = () => {

    const cardsNews = news.map((n, idx) => ( <CardNew key={ idx }/> ));

    return (
      <GliderComponent key={ uuidv4() } items={ cardsNews } />
    )
}
