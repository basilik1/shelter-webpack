export default function (htmlStr) {
    const template = document.createElement('template');
    template.innerHTML = htmlStr;
    return template.content.firstChild;
}