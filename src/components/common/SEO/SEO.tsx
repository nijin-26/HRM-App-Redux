import { Helmet } from "react-helmet-async";

type TSEO = {
    title: string;
    description?: string;
};

const SEO = ({ title, description }: TSEO) => {
    return (
        <div>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
            </Helmet>
        </div>
    );
};

export default SEO;
