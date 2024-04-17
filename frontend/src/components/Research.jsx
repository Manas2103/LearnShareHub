import React from 'react'
import InputBtn from './InputBtn'

export default function Research() {

    const researchEle = [
        {
            title : "Image Classification",
            content: "Image classification using deep learning is a powerful computer vision technique that involves training neural networks to recognize and categorize objects or patterns within images. Deep learning models, such as Convolutional Neural Networks (CNNs), have revolutionized this field by automatically learning hierarchical features from raw pixel data, allowing them to excel in tasks like identifying animals in photos, detecting diseases in medical images, or even recognizing handwritten characters. Through a process of training on labeled data, these models can generalize their knowledge to accurately classify new, unseen images, making them indispensable in various real-world applications, from autonomous vehicles to content recommendation systems.",
            image : "./src/assets/images/imageClassification.jpeg",
            url : "https://www.sciencedirect.com/topics/engineering/image-classification#:~:text=Image%20classification%20is%20the%20process,more%20spectral%20or%20textural%20characteristics."
        },
        {
            title : "Object Detection",
            content : "Object detection using deep learning is a cutting-edge computer vision technique that goes beyond simple image classification by not only identifying objects in images but also precisely locating and outlining them. Convolutional Neural Networks (CNNs) play a pivotal role in this process, as they can simultaneously classify and localize multiple objects within an image. This technology finds broad application in diverse fields, including autonomous driving, surveillance systems, and even in retail for inventory management and cashier-less stores. With its ability to provide detailed information about object positions and categories within images, deep learning-based object detection has become an essential tool in enhancing automation and efficiency across numerous industries.",
            image : "./src/assets/images/objectDetection.jpeg",
            url : "https://www.sciencedirect.com/topics/engineering/object-recognition"

        },
        {
            title : "Video Classification",
            content : "Video classification using deep learning is a sophisticated approach that involves training neural networks to recognize and categorize the content of video sequences. By leveraging recurrent neural networks (RNNs), 3D convolutional networks, or other architectures, these models can process sequential data effectively. Applications of video classification are diverse and impactful. In the realm of entertainment, it enables content recommendation systems to suggest videos based on user preferences. In healthcare, it aids in diagnosing diseases by analyzing medical imaging sequences. In surveillance, it helps identify suspicious activities or objects in security footage. Furthermore, it plays a crucial role in autonomous vehicles, enabling them to understand and react to dynamic traffic situations. Video classification using deep learning continues to advance and find new applications across various domains, driving innovation in the field of artificial intelligence.",
            image : "./src/assets/images/videoClassification.jpeg",
            url : "https://www.sciencedirect.com/science/article/abs/pii/S1077314215002325"

        },
        {
            title : "Image Segmentation",
            content : "Image segmentation with deep learning is the process of dividing an image into distinct regions, enabling precise object detection and analysis. This technology finds extensive use in medical imaging for tasks like tumor detection, in autonomous vehicles for road scene understanding, and in satellite imagery for land use classification. It empowers applications in diverse fields, from agriculture and gaming to healthcare and environmental monitoring, by providing detailed insights into image content and facilitating data-driven decision-making.",
            image : "./src/assets/images/imageSegmentation.jpeg",
            url : "https://www.sciencedirect.com/topics/nursing-and-health-professions/image-segmentation"

        },
        {
            title : "Natural Language Processing",
            content : "Natural Language Processing (NLP) using deep learning involves the utilization of neural networks to understand, generate, and manipulate human language. Deep learning models like Recurrent Neural Networks (RNNs) and Transformers have revolutionized NLP tasks. One prominent application is sentiment analysis, where deep learning models classify text as positive, negative, or neutral to gauge public opinion. Additionally, chatbots powered by deep learning can provide human-like interactions in customer service. Machine translation, exemplified by Google Translate, employs deep learning to translate text between languages accurately. NLP with deep learning also aids in text summarization, question-answering systems, and personal assistants like Apple’s Siri and Amazon’s Alexa, making it an essential technology for automating language-related tasks and enhancing user experiences.",
            image : "./src/assets/images/nlp.jpeg",
            url : "https://www.sciencedirect.com/topics/neuroscience/natural-language-processing"
        }

    ]
  return (
    <div className="col-md-10 right">
      <div className="home">Reasearch</div>
      <div className="research">
        {
            researchEle.map((ele) => 
                <div className="researchBox" key={ele.title}>
                    <div className='titleRes'>
                        {ele.title}
                    </div>
                    <div className="contentBox row">
                        <div className="contentResearch col-md-9">
                            {ele.content} <br />
                            <br />
                            <InputBtn children={"Read More"} path = {ele.url}/>
                        </div>
                        <div className="contentImage col-md-2">
                            <img height={180} width={190} src={ele.image} alt={ele.title} />
                        </div>
                    </div>
                </div>
            )
        }
      </div>
    </div>
  )
}
