export default function Copyright(props)
{
    if(props.license)
    {
        let license = props.license.toLowerCase();
        if(license === "cc-by" || license === "by")
        {
            if(props.small) {
                return <><a rel="license" href="http://creativecommons.org/licenses/by/4.0/"><img
                    alt="Creative Commons License" src="https://i.creativecommons.org/l/by/4.0/80x15.png"/></a></>
            }else {
                return <><a rel="license" href="http://creativecommons.org/licenses/by/4.0/"><img
                    alt="Creative Commons License" src="https://i.creativecommons.org/l/by/4.0/80x15.png"/></a>
                <br />The work on this page is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a></>
            }
        }else if(license === "cc0" || license === "public" || license === "publicdomain" || license === "none")
        {
            if(props.small) {
                return <><a rel="license"
                            href="http://creativecommons.org/publicdomain/zero/1.0/">
                    <img src="https://licensebuttons.net/p/zero/1.0/80x15.png" alt="CC0" />
                </a></>
            }else {
                return <>
                    <p >
                        <a rel="license"
                           href="http://creativecommons.org/publicdomain/zero/1.0/">
                            <img src="https://licensebuttons.net/p/zero/1.0/80x15.png" alt="CC0" />
                        </a>
                        <br />
                        To the extent possible under law,
                        <span rel="dct:publisher" resource="[_:publisher]">the person who associated CC0 </span>
                        with this work has waived all copyright and related or neighboring rights to the work on this page.
                    </p>
                </>
            }
        }else if(license === "by-sa" || license === "cc-by-sa")
        {
            if(props.small)
            {
                return <>
                    <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="Creative Commons License" src="https://i.creativecommons.org/l/by-sa/4.0/80x15.png" /></a>
                </>
            }else{
                return <>
                    <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="Creative Commons License" src="https://i.creativecommons.org/l/by-sa/4.0/80x15.png" /></a><br />The work on this page is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike 4.0 International License</a>.
                </>
            }
        }else if(license === "by-nc" || license === "cc-by-nc")
        {
            if(props.small)
            {
                return <><a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/"><img alt="Creative Commons License" src="https://i.creativecommons.org/l/by-nc/4.0/80x15.png" /></a></>
            }else{
                return <>
                    <a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/"><img alt="Creative Commons License" src="https://i.creativecommons.org/l/by-nc/4.0/80x15.png" /></a><br />The work on this page is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/">Creative Commons Attribution-NonCommercial 4.0 International License</a>.
                </>
            }
        }else if(license === "by-nc-sa" || license === "cc-by-nc-sa")
        {
            if(props.small)
            {
                return <><a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" src="https://i.creativecommons.org/l/by-nc-sa/4.0/80x15.png" /></a></>
            }else{
                return <>
                    <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" src="https://i.creativecommons.org/l/by-nc-sa/4.0/80x15.png" /></a><br />The work on this page is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.
                </>
            }
        }else if(license === "by-nc-sa" || license === "cc-by-nc-sa")
        {
            if(props.small)
            {
                return <>
                    <a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/"><img alt="Creative Commons License" src="https://i.creativecommons.org/l/by-nc-nd/4.0/80x15.png" /></a>

                </>
            }else{
                return <>
                    <a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/"><img alt="Creative Commons License" src="https://i.creativecommons.org/l/by-nc-nd/4.0/80x15.png" /></a><br />The work on this page is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/">Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License</a>.
                </>
            }
        }

    }

    //else
    return <>No License Specified.</>;
}
