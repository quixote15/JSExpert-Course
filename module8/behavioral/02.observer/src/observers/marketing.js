export default class Marketing {
  update({id, userName}) {
    // importante lembrar que o [update] é responsável por gerenciar seus erros/exceçoes
    // nao deve-se ter await no notify por que a resposabilidade do notify é só emitir eventos
    // só notificar todo mundo.
    console.log(`[${id}]: [marketing] will an welcome email to ${userName}`);
  }
}