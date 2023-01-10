
import { GliderComponent } from "../../ui/glider"
import { v4 as uuidv4 } from 'uuid';
import { CardNew } from "./";

import styles from './new.module.css';

const news = [
    {
        ago_text: "15 days ago",
        title: "Lorem ipsum",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In efficitur massa sit amet urna tristique rutrum. Integer est felis, dignissim ut euismod quis, mollis at libero...",
        image_url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAABcCAMAAADUMSJqAAAA0lBMVEXV1dUEl8sAkcnW09To5eCcz+Xr5eIAlcsAkcvR09Pt7/D07+5PqtT///////0AlMj/2ABqs9kAjsvW08/j3eC83Oq02ekAjMKNxd707un8/ff51AD+0wDOxk5ho6/f8Peqz+MtoNB+vt0Ak9Xy1ABeqKjo9fhJorY/nrcAkN9SoawdnMLw+vjkzzDw0SB+s35sqqS8wluguXnPyEJot9fH5O3Ex06uv22HsobYzDEAhMMAidK6wWaJsJCsuIIbmLWVtIKdu21mqZri7uR8rJZIpt3F3QmaAAACd0lEQVRoge2W23KbMBRFgxpyFEdIQItNuEQW1JgacB0H5ULq5tL0/3+pInbS5A1w+9JqvUijGRabM+hIBwcajUaj0Wg0Go3m/+ZDf7qqP3467MvRcVf5yDP7Mh51Ux8fmi7qy8Q/6mY/Jch4hSHE2lENGF4WwQDjPUBGnQpzfErePMr8qVADmSZinGzXAavXsP3koJ4HQKOAAIATeA71ANovSOPPs5f0GLbf01l+sktOBBCMMiqEgVVdlB8Az3P2JbYXOM3zIkX5AuYF9JcDCcoy4MCtLCiFiq3keF5F0fJrGIar8ygK1+lFdBNWrb2nnBEa8JLWnGZZMHUsqeTNZXj1sM6r8CqfnV8vw3kcVTcr3D+5kmfNmPqcklrFttrkt5d2/G3TliXN19+r8Cy2c8ADag6E8sZUcos4Wzn10vy8Cu3HOFoIO6qWrfwO9/tbXuWBOaKJSv4sl4RKY34/f7DXsb15tOPiOfkdDJRTalEjU3JVcEu6pfVjadt2WGxs+6md2WcXA+Wq5pIkAiW+EL4j/BqJxDFWm1WB3Nl1YTwtZpvicVOggfLMRcCYiycuBgTIbRh2G1c1Hjc12C1CGCCFnjt0t4mEabapUCKlo3IbRMoaPMlrnIwNkHjY9t/J4bljgcOdxJn6rigdUhLu+NyVJQE62Uu+BZmm4FzJCW/csc95Zv70kjEKmj/QFVVyVpRTnwmLiLLmoijNICsxnYj95arncklUYl/VPEEel7UHrllLzgXsLTfUIYGY6roMq3aLMFbzttO+OTv6yN8fc3jH7xl+WR5yzB2c/L0Dur1aHPWm89ViAN0vRRqNRqPRaDQajeZf4xcyZUiimjRiGQAAAABJRU5ErkJggg==",
        link: "https://www.google.com"
    },
    {
        ago_text: "15 days ago",
        title: "Lorem ipsum",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In efficitur massa sit amet urna tristique rutrum. Integer est felis, dignissim ut euismod quis, mollis at libero...",
        image_url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAABcCAMAAADUMSJqAAAA0lBMVEXV1dUEl8sAkcnW09To5eCcz+Xr5eIAlcsAkcvR09Pt7/D07+5PqtT///////0AlMj/2ABqs9kAjsvW08/j3eC83Oq02ekAjMKNxd707un8/ff51AD+0wDOxk5ho6/f8Peqz+MtoNB+vt0Ak9Xy1ABeqKjo9fhJorY/nrcAkN9SoawdnMLw+vjkzzDw0SB+s35sqqS8wluguXnPyEJot9fH5O3Ex06uv22HsobYzDEAhMMAidK6wWaJsJCsuIIbmLWVtIKdu21mqZri7uR8rJZIpt3F3QmaAAACd0lEQVRoge2W23KbMBRFgxpyFEdIQItNuEQW1JgacB0H5ULq5tL0/3+pInbS5A1w+9JqvUijGRabM+hIBwcajUaj0Wg0Go3m/+ZDf7qqP3467MvRcVf5yDP7Mh51Ux8fmi7qy8Q/6mY/Jch4hSHE2lENGF4WwQDjPUBGnQpzfErePMr8qVADmSZinGzXAavXsP3koJ4HQKOAAIATeA71ANovSOPPs5f0GLbf01l+sktOBBCMMiqEgVVdlB8Az3P2JbYXOM3zIkX5AuYF9JcDCcoy4MCtLCiFiq3keF5F0fJrGIar8ygK1+lFdBNWrb2nnBEa8JLWnGZZMHUsqeTNZXj1sM6r8CqfnV8vw3kcVTcr3D+5kmfNmPqcklrFttrkt5d2/G3TliXN19+r8Cy2c8ADag6E8sZUcos4Wzn10vy8Cu3HOFoIO6qWrfwO9/tbXuWBOaKJSv4sl4RKY34/f7DXsb15tOPiOfkdDJRTalEjU3JVcEu6pfVjadt2WGxs+6md2WcXA+Wq5pIkAiW+EL4j/BqJxDFWm1WB3Nl1YTwtZpvicVOggfLMRcCYiycuBgTIbRh2G1c1Hjc12C1CGCCFnjt0t4mEabapUCKlo3IbRMoaPMlrnIwNkHjY9t/J4bljgcOdxJn6rigdUhLu+NyVJQE62Uu+BZmm4FzJCW/csc95Zv70kjEKmj/QFVVyVpRTnwmLiLLmoijNICsxnYj95arncklUYl/VPEEel7UHrllLzgXsLTfUIYGY6roMq3aLMFbzttO+OTv6yN8fc3jH7xl+WR5yzB2c/L0Dur1aHPWm89ViAN0vRRqNRqPRaDQajeZf4xcyZUiimjRiGQAAAABJRU5ErkJggg==",
        link: "https://www.google.com"
    },
    {
        ago_text: "15 days ago",
        title: "Lorem ipsum",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In efficitur massa sit amet urna tristique rutrum. Integer est felis, dignissim ut euismod quis, mollis at libero...",
        image_url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAABcCAMAAADUMSJqAAAA0lBMVEXV1dUEl8sAkcnW09To5eCcz+Xr5eIAlcsAkcvR09Pt7/D07+5PqtT///////0AlMj/2ABqs9kAjsvW08/j3eC83Oq02ekAjMKNxd707un8/ff51AD+0wDOxk5ho6/f8Peqz+MtoNB+vt0Ak9Xy1ABeqKjo9fhJorY/nrcAkN9SoawdnMLw+vjkzzDw0SB+s35sqqS8wluguXnPyEJot9fH5O3Ex06uv22HsobYzDEAhMMAidK6wWaJsJCsuIIbmLWVtIKdu21mqZri7uR8rJZIpt3F3QmaAAACd0lEQVRoge2W23KbMBRFgxpyFEdIQItNuEQW1JgacB0H5ULq5tL0/3+pInbS5A1w+9JqvUijGRabM+hIBwcajUaj0Wg0Go3m/+ZDf7qqP3467MvRcVf5yDP7Mh51Ux8fmi7qy8Q/6mY/Jch4hSHE2lENGF4WwQDjPUBGnQpzfErePMr8qVADmSZinGzXAavXsP3koJ4HQKOAAIATeA71ANovSOPPs5f0GLbf01l+sktOBBCMMiqEgVVdlB8Az3P2JbYXOM3zIkX5AuYF9JcDCcoy4MCtLCiFiq3keF5F0fJrGIar8ygK1+lFdBNWrb2nnBEa8JLWnGZZMHUsqeTNZXj1sM6r8CqfnV8vw3kcVTcr3D+5kmfNmPqcklrFttrkt5d2/G3TliXN19+r8Cy2c8ADag6E8sZUcos4Wzn10vy8Cu3HOFoIO6qWrfwO9/tbXuWBOaKJSv4sl4RKY34/f7DXsb15tOPiOfkdDJRTalEjU3JVcEu6pfVjadt2WGxs+6md2WcXA+Wq5pIkAiW+EL4j/BqJxDFWm1WB3Nl1YTwtZpvicVOggfLMRcCYiycuBgTIbRh2G1c1Hjc12C1CGCCFnjt0t4mEabapUCKlo3IbRMoaPMlrnIwNkHjY9t/J4bljgcOdxJn6rigdUhLu+NyVJQE62Uu+BZmm4FzJCW/csc95Zv70kjEKmj/QFVVyVpRTnwmLiLLmoijNICsxnYj95arncklUYl/VPEEel7UHrllLzgXsLTfUIYGY6roMq3aLMFbzttO+OTv6yN8fc3jH7xl+WR5yzB2c/L0Dur1aHPWm89ViAN0vRRqNRqPRaDQajeZf4xcyZUiimjRiGQAAAABJRU5ErkJggg==",
        link: "https://www.google.com"
    },
    {
        ago_text: "15 days ago",
        title: "Lorem ipsum",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In efficitur massa sit amet urna tristique rutrum. Integer est felis, dignissim ut euismod quis, mollis at libero...",
        image_url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAABcCAMAAADUMSJqAAAA0lBMVEXV1dUEl8sAkcnW09To5eCcz+Xr5eIAlcsAkcvR09Pt7/D07+5PqtT///////0AlMj/2ABqs9kAjsvW08/j3eC83Oq02ekAjMKNxd707un8/ff51AD+0wDOxk5ho6/f8Peqz+MtoNB+vt0Ak9Xy1ABeqKjo9fhJorY/nrcAkN9SoawdnMLw+vjkzzDw0SB+s35sqqS8wluguXnPyEJot9fH5O3Ex06uv22HsobYzDEAhMMAidK6wWaJsJCsuIIbmLWVtIKdu21mqZri7uR8rJZIpt3F3QmaAAACd0lEQVRoge2W23KbMBRFgxpyFEdIQItNuEQW1JgacB0H5ULq5tL0/3+pInbS5A1w+9JqvUijGRabM+hIBwcajUaj0Wg0Go3m/+ZDf7qqP3467MvRcVf5yDP7Mh51Ux8fmi7qy8Q/6mY/Jch4hSHE2lENGF4WwQDjPUBGnQpzfErePMr8qVADmSZinGzXAavXsP3koJ4HQKOAAIATeA71ANovSOPPs5f0GLbf01l+sktOBBCMMiqEgVVdlB8Az3P2JbYXOM3zIkX5AuYF9JcDCcoy4MCtLCiFiq3keF5F0fJrGIar8ygK1+lFdBNWrb2nnBEa8JLWnGZZMHUsqeTNZXj1sM6r8CqfnV8vw3kcVTcr3D+5kmfNmPqcklrFttrkt5d2/G3TliXN19+r8Cy2c8ADag6E8sZUcos4Wzn10vy8Cu3HOFoIO6qWrfwO9/tbXuWBOaKJSv4sl4RKY34/f7DXsb15tOPiOfkdDJRTalEjU3JVcEu6pfVjadt2WGxs+6md2WcXA+Wq5pIkAiW+EL4j/BqJxDFWm1WB3Nl1YTwtZpvicVOggfLMRcCYiycuBgTIbRh2G1c1Hjc12C1CGCCFnjt0t4mEabapUCKlo3IbRMoaPMlrnIwNkHjY9t/J4bljgcOdxJn6rigdUhLu+NyVJQE62Uu+BZmm4FzJCW/csc95Zv70kjEKmj/QFVVyVpRTnwmLiLLmoijNICsxnYj95arncklUYl/VPEEel7UHrllLzgXsLTfUIYGY6roMq3aLMFbzttO+OTv6yN8fc3jH7xl+WR5yzB2c/L0Dur1aHPWm89ViAN0vRRqNRqPRaDQajeZf4xcyZUiimjRiGQAAAABJRU5ErkJggg==",
        link: "https://www.google.com"
    },
    {
        ago_text: "15 days ago",
        title: "Lorem ipsum",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In efficitur massa sit amet urna tristique rutrum. Integer est felis, dignissim ut euismod quis, mollis at libero...",
        image_url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAABcCAMAAADUMSJqAAAA0lBMVEXV1dUEl8sAkcnW09To5eCcz+Xr5eIAlcsAkcvR09Pt7/D07+5PqtT///////0AlMj/2ABqs9kAjsvW08/j3eC83Oq02ekAjMKNxd707un8/ff51AD+0wDOxk5ho6/f8Peqz+MtoNB+vt0Ak9Xy1ABeqKjo9fhJorY/nrcAkN9SoawdnMLw+vjkzzDw0SB+s35sqqS8wluguXnPyEJot9fH5O3Ex06uv22HsobYzDEAhMMAidK6wWaJsJCsuIIbmLWVtIKdu21mqZri7uR8rJZIpt3F3QmaAAACd0lEQVRoge2W23KbMBRFgxpyFEdIQItNuEQW1JgacB0H5ULq5tL0/3+pInbS5A1w+9JqvUijGRabM+hIBwcajUaj0Wg0Go3m/+ZDf7qqP3467MvRcVf5yDP7Mh51Ux8fmi7qy8Q/6mY/Jch4hSHE2lENGF4WwQDjPUBGnQpzfErePMr8qVADmSZinGzXAavXsP3koJ4HQKOAAIATeA71ANovSOPPs5f0GLbf01l+sktOBBCMMiqEgVVdlB8Az3P2JbYXOM3zIkX5AuYF9JcDCcoy4MCtLCiFiq3keF5F0fJrGIar8ygK1+lFdBNWrb2nnBEa8JLWnGZZMHUsqeTNZXj1sM6r8CqfnV8vw3kcVTcr3D+5kmfNmPqcklrFttrkt5d2/G3TliXN19+r8Cy2c8ADag6E8sZUcos4Wzn10vy8Cu3HOFoIO6qWrfwO9/tbXuWBOaKJSv4sl4RKY34/f7DXsb15tOPiOfkdDJRTalEjU3JVcEu6pfVjadt2WGxs+6md2WcXA+Wq5pIkAiW+EL4j/BqJxDFWm1WB3Nl1YTwtZpvicVOggfLMRcCYiycuBgTIbRh2G1c1Hjc12C1CGCCFnjt0t4mEabapUCKlo3IbRMoaPMlrnIwNkHjY9t/J4bljgcOdxJn6rigdUhLu+NyVJQE62Uu+BZmm4FzJCW/csc95Zv70kjEKmj/QFVVyVpRTnwmLiLLmoijNICsxnYj95arncklUYl/VPEEel7UHrllLzgXsLTfUIYGY6roMq3aLMFbzttO+OTv6yN8fc3jH7xl+WR5yzB2c/L0Dur1aHPWm89ViAN0vRRqNRqPRaDQajeZf4xcyZUiimjRiGQAAAABJRU5ErkJggg==",
        link: "https://www.google.com"
    },
    {
        ago_text: "15 days ago",
        title: "Lorem ipsum",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In efficitur massa sit amet urna tristique rutrum. Integer est felis, dignissim ut euismod quis, mollis at libero...",
        image_url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAABcCAMAAADUMSJqAAAA0lBMVEXV1dUEl8sAkcnW09To5eCcz+Xr5eIAlcsAkcvR09Pt7/D07+5PqtT///////0AlMj/2ABqs9kAjsvW08/j3eC83Oq02ekAjMKNxd707un8/ff51AD+0wDOxk5ho6/f8Peqz+MtoNB+vt0Ak9Xy1ABeqKjo9fhJorY/nrcAkN9SoawdnMLw+vjkzzDw0SB+s35sqqS8wluguXnPyEJot9fH5O3Ex06uv22HsobYzDEAhMMAidK6wWaJsJCsuIIbmLWVtIKdu21mqZri7uR8rJZIpt3F3QmaAAACd0lEQVRoge2W23KbMBRFgxpyFEdIQItNuEQW1JgacB0H5ULq5tL0/3+pInbS5A1w+9JqvUijGRabM+hIBwcajUaj0Wg0Go3m/+ZDf7qqP3467MvRcVf5yDP7Mh51Ux8fmi7qy8Q/6mY/Jch4hSHE2lENGF4WwQDjPUBGnQpzfErePMr8qVADmSZinGzXAavXsP3koJ4HQKOAAIATeA71ANovSOPPs5f0GLbf01l+sktOBBCMMiqEgVVdlB8Az3P2JbYXOM3zIkX5AuYF9JcDCcoy4MCtLCiFiq3keF5F0fJrGIar8ygK1+lFdBNWrb2nnBEa8JLWnGZZMHUsqeTNZXj1sM6r8CqfnV8vw3kcVTcr3D+5kmfNmPqcklrFttrkt5d2/G3TliXN19+r8Cy2c8ADag6E8sZUcos4Wzn10vy8Cu3HOFoIO6qWrfwO9/tbXuWBOaKJSv4sl4RKY34/f7DXsb15tOPiOfkdDJRTalEjU3JVcEu6pfVjadt2WGxs+6md2WcXA+Wq5pIkAiW+EL4j/BqJxDFWm1WB3Nl1YTwtZpvicVOggfLMRcCYiycuBgTIbRh2G1c1Hjc12C1CGCCFnjt0t4mEabapUCKlo3IbRMoaPMlrnIwNkHjY9t/J4bljgcOdxJn6rigdUhLu+NyVJQE62Uu+BZmm4FzJCW/csc95Zv70kjEKmj/QFVVyVpRTnwmLiLLmoijNICsxnYj95arncklUYl/VPEEel7UHrllLzgXsLTfUIYGY6roMq3aLMFbzttO+OTv6yN8fc3jH7xl+WR5yzB2c/L0Dur1aHPWm89ViAN0vRRqNRqPRaDQajeZf4xcyZUiimjRiGQAAAABJRU5ErkJggg==",
        link: "https://www.google.com"
    },
    {
        ago_text: "15 days ago",
        title: "Lorem ipsum",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In efficitur massa sit amet urna tristique rutrum. Integer est felis, dignissim ut euismod quis, mollis at libero...",
        image_url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAABcCAMAAADUMSJqAAAA0lBMVEXV1dUEl8sAkcnW09To5eCcz+Xr5eIAlcsAkcvR09Pt7/D07+5PqtT///////0AlMj/2ABqs9kAjsvW08/j3eC83Oq02ekAjMKNxd707un8/ff51AD+0wDOxk5ho6/f8Peqz+MtoNB+vt0Ak9Xy1ABeqKjo9fhJorY/nrcAkN9SoawdnMLw+vjkzzDw0SB+s35sqqS8wluguXnPyEJot9fH5O3Ex06uv22HsobYzDEAhMMAidK6wWaJsJCsuIIbmLWVtIKdu21mqZri7uR8rJZIpt3F3QmaAAACd0lEQVRoge2W23KbMBRFgxpyFEdIQItNuEQW1JgacB0H5ULq5tL0/3+pInbS5A1w+9JqvUijGRabM+hIBwcajUaj0Wg0Go3m/+ZDf7qqP3467MvRcVf5yDP7Mh51Ux8fmi7qy8Q/6mY/Jch4hSHE2lENGF4WwQDjPUBGnQpzfErePMr8qVADmSZinGzXAavXsP3koJ4HQKOAAIATeA71ANovSOPPs5f0GLbf01l+sktOBBCMMiqEgVVdlB8Az3P2JbYXOM3zIkX5AuYF9JcDCcoy4MCtLCiFiq3keF5F0fJrGIar8ygK1+lFdBNWrb2nnBEa8JLWnGZZMHUsqeTNZXj1sM6r8CqfnV8vw3kcVTcr3D+5kmfNmPqcklrFttrkt5d2/G3TliXN19+r8Cy2c8ADag6E8sZUcos4Wzn10vy8Cu3HOFoIO6qWrfwO9/tbXuWBOaKJSv4sl4RKY34/f7DXsb15tOPiOfkdDJRTalEjU3JVcEu6pfVjadt2WGxs+6md2WcXA+Wq5pIkAiW+EL4j/BqJxDFWm1WB3Nl1YTwtZpvicVOggfLMRcCYiycuBgTIbRh2G1c1Hjc12C1CGCCFnjt0t4mEabapUCKlo3IbRMoaPMlrnIwNkHjY9t/J4bljgcOdxJn6rigdUhLu+NyVJQE62Uu+BZmm4FzJCW/csc95Zv70kjEKmj/QFVVyVpRTnwmLiLLmoijNICsxnYj95arncklUYl/VPEEel7UHrllLzgXsLTfUIYGY6roMq3aLMFbzttO+OTv6yN8fc3jH7xl+WR5yzB2c/L0Dur1aHPWm89ViAN0vRRqNRqPRaDQajeZf4xcyZUiimjRiGQAAAABJRU5ErkJggg==",
        link: "https://www.google.com"
    },
    {
        ago_text: "15 days ago",
        title: "Lorem ipsum",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In efficitur massa sit amet urna tristique rutrum. Integer est felis, dignissim ut euismod quis, mollis at libero...",
        image_url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAABcCAMAAADUMSJqAAAA0lBMVEXV1dUEl8sAkcnW09To5eCcz+Xr5eIAlcsAkcvR09Pt7/D07+5PqtT///////0AlMj/2ABqs9kAjsvW08/j3eC83Oq02ekAjMKNxd707un8/ff51AD+0wDOxk5ho6/f8Peqz+MtoNB+vt0Ak9Xy1ABeqKjo9fhJorY/nrcAkN9SoawdnMLw+vjkzzDw0SB+s35sqqS8wluguXnPyEJot9fH5O3Ex06uv22HsobYzDEAhMMAidK6wWaJsJCsuIIbmLWVtIKdu21mqZri7uR8rJZIpt3F3QmaAAACd0lEQVRoge2W23KbMBRFgxpyFEdIQItNuEQW1JgacB0H5ULq5tL0/3+pInbS5A1w+9JqvUijGRabM+hIBwcajUaj0Wg0Go3m/+ZDf7qqP3467MvRcVf5yDP7Mh51Ux8fmi7qy8Q/6mY/Jch4hSHE2lENGF4WwQDjPUBGnQpzfErePMr8qVADmSZinGzXAavXsP3koJ4HQKOAAIATeA71ANovSOPPs5f0GLbf01l+sktOBBCMMiqEgVVdlB8Az3P2JbYXOM3zIkX5AuYF9JcDCcoy4MCtLCiFiq3keF5F0fJrGIar8ygK1+lFdBNWrb2nnBEa8JLWnGZZMHUsqeTNZXj1sM6r8CqfnV8vw3kcVTcr3D+5kmfNmPqcklrFttrkt5d2/G3TliXN19+r8Cy2c8ADag6E8sZUcos4Wzn10vy8Cu3HOFoIO6qWrfwO9/tbXuWBOaKJSv4sl4RKY34/f7DXsb15tOPiOfkdDJRTalEjU3JVcEu6pfVjadt2WGxs+6md2WcXA+Wq5pIkAiW+EL4j/BqJxDFWm1WB3Nl1YTwtZpvicVOggfLMRcCYiycuBgTIbRh2G1c1Hjc12C1CGCCFnjt0t4mEabapUCKlo3IbRMoaPMlrnIwNkHjY9t/J4bljgcOdxJn6rigdUhLu+NyVJQE62Uu+BZmm4FzJCW/csc95Zv70kjEKmj/QFVVyVpRTnwmLiLLmoijNICsxnYj95arncklUYl/VPEEel7UHrllLzgXsLTfUIYGY6roMq3aLMFbzttO+OTv6yN8fc3jH7xl+WR5yzB2c/L0Dur1aHPWm89ViAN0vRRqNRqPRaDQajeZf4xcyZUiimjRiGQAAAABJRU5ErkJggg==",
        link: "https://www.google.com"
    },
]

export const NewsContainer = () => {

    const cardsNews = news.map((n, idx) => ( <CardNew key={ idx } news={ n } /> ));

    return (
        <div className={ styles['news-container'] }>
            <h2 className={ styles['news-section-title'] }>News</h2>
            <GliderComponent key={ uuidv4() } items={ cardsNews } breakpoint={ 800 } slidesToShow={ 2 } />
        </div>
    )
}
