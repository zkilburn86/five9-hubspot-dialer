
type Disposition = {
    id: string;
    label: string;
}

type DispositionResult = Disposition[]

class DispositionHandler {

    static storeDispositions = () => {
        fetch('/api/disposition', {
            method: 'GET',
            credentials: 'same-origin',
            mode: 'same-origin'
          })
          .then(response => response.json())
          .then(data => {
            for (let disposition of data as DispositionResult) {
                localStorage.setItem(
                    disposition.label,
                    disposition.id
                );
            }
          })
          .catch((error) => {
            console.error('Error: ', error);
          });
    }

    static getDispositionId = (label: string): string => {
        let dispositionId = localStorage.getItem(label);
        if (dispositionId !== null) {
            return dispositionId;
        } else {
            return '';
        }
    }

}

export default DispositionHandler;