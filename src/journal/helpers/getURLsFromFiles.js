export const getURLsFromFiles = async(files) => {

    const promises = [];

    files.forEach(file => {

        promises.push( new Promise(resolve => {

            const reader = new FileReader();

            reader.onload = () => {

                resolve(reader.result);

            }

            reader.readAsDataURL(file)

        }) );

    })

    return await Promise.all(promises);

}